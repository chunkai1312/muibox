import { useState } from "react";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DialogProvider, useDialog } from "../src/index.js";

afterEach(() => cleanup());

const customMessage = <strong>Custom message</strong>;

describe("DialogProvider", () => {
  it("shows queued requests in order and settles every promise", async () => {
    function QueueFlow() {
      const dialog = useDialog();
      const [result, setResult] = useState("pending");

      const run = () => {
        void Promise.all([dialog.alert("First"), dialog.alert("Second")]).then(
          () => setResult("done"),
        );
      };

      return (
        <>
          <button type="button" onClick={run}>
            Start queue
          </button>
          <output>{result}</output>
        </>
      );
    }

    render(
      <DialogProvider>
        <QueueFlow />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start queue" }));
    expect(await screen.findByText("First")).toBeTruthy();
    expect(screen.queryByText("Second")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    expect(await screen.findByText("Second")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    await waitFor(() => expect(screen.getByText("done")).toBeTruthy());
  });

  it("keeps a dialog opened from the previous promise callback", async () => {
    function ChainedFlow() {
      const dialog = useDialog();
      const [result, setResult] = useState("pending");

      const run = () => {
        void dialog
          .prompt({ title: "Step 1", defaultValue: "value" })
          .then(() => dialog.alert({ title: "Step 2", message: "Still open" }))
          .then(() => setResult("done"));
      };

      return (
        <>
          <button type="button" onClick={run}>
            Start chain
          </button>
          <output>{result}</output>
        </>
      );
    }

    render(
      <DialogProvider>
        <ChainedFlow />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start chain" }));
    expect(await screen.findByText("Step 1")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));

    expect(await screen.findByText("Step 2")).toBeTruthy();
    expect(screen.getByText("Still open")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    await waitFor(() => expect(screen.getByText("done")).toBeTruthy());
  });

  it("uses unique accessible IDs for dialogs in a stack", async () => {
    function StackFlow() {
      const dialog = useDialog();

      const run = () => {
        void dialog.alert({ title: "First", message: "One" }).catch(() => {});
        void dialog.alert({ title: "Second", message: "Two" }).catch(() => {});
      };

      return (
        <button type="button" onClick={run}>
          Start stack
        </button>
      );
    }

    render(
      <DialogProvider mode="stack">
        <StackFlow />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Start stack" }));

    await waitFor(() => {
      expect(document.querySelectorAll('[role="dialog"]')).toHaveLength(2);
    });

    const dialogs = Array.from(document.querySelectorAll('[role="dialog"]'));
    const titleIds = dialogs.map((dialog) => dialog.getAttribute("aria-labelledby"));
    const messageIds = dialogs.map((dialog) =>
      dialog.getAttribute("aria-describedby"),
    );

    expect(new Set(titleIds).size).toBe(2);
    expect(new Set(messageIds).size).toBe(2);
    [...titleIds, ...messageIds].forEach((id) => {
      expect(id).not.toBeNull();
      expect(document.getElementById(id!)).not.toBeNull();
    });
  });

  it("provides an aria description target for a JSX message", async () => {
    function CustomMessage() {
      const dialog = useDialog();
      return (
        <button
            type="button"
            onClick={() => {
              void dialog.alert({ message: customMessage }).catch(() => {});
            }}
        >
          Open custom message
        </button>
      );
    }

    render(
      <DialogProvider>
        <CustomMessage />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open custom message" }));
    const renderedDialog = await screen.findByRole("dialog");
    const descriptionId = renderedDialog.getAttribute("aria-describedby");

    expect(descriptionId).not.toBeNull();
    expect(document.getElementById(descriptionId!)?.textContent).toBe(
      "Custom message",
    );
  });

  it("accepts numeric zero when a prompt is required", async () => {
    function ZeroPrompt() {
      const dialog = useDialog();
      const [result, setResult] = useState("pending");

      return (
        <>
          <button
            type="button"
            onClick={() => {
              void dialog
                .prompt({ defaultValue: 0, required: true })
                .then((value) => setResult(`${typeof value}:${value}`));
            }}
          >
            Open zero prompt
          </button>
          <output>{result}</output>
        </>
      );
    }

    render(
      <DialogProvider>
        <ZeroPrompt />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open zero prompt" }));
    const ok = await screen.findByRole("button", { name: "OK" });

    expect(ok.hasAttribute("disabled")).toBe(false);
    fireEvent.click(ok);
    await waitFor(() => expect(screen.getByText("number:0")).toBeTruthy());
  });

  it("clears the queue when dismissAll follows enqueue in the same tick", async () => {
    function ImmediateDismiss() {
      const dialog = useDialog();
      const [result, setResult] = useState("pending");

      const run = () => {
        const dismissed = dialog.alert("Dismissed");
        dialog.dismissAll();

        void dismissed.catch(() =>
          dialog.alert("Next request").then(() => setResult("done")),
        );
      };

      return (
        <>
          <button type="button" onClick={run}>
            Dismiss immediately
          </button>
          <output>{result}</output>
        </>
      );
    }

    render(
      <DialogProvider>
        <ImmediateDismiss />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Dismiss immediately" }));
    expect(await screen.findByText("Next request")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "OK" }));
    await waitFor(() => expect(screen.getByText("done")).toBeTruthy());
  });

  it("throws when useDialog is rendered without a provider", () => {
    function MissingProvider() {
      useDialog();
      return null;
    }

    expect(() => render(<MissingProvider />)).toThrow(
      "muibox: useDialog must be used within a DialogProvider",
    );
  });

  it("rejects pending requests when the provider unmounts", async () => {
    const rejected = vi.fn();

    function PendingDialog() {
      const dialog = useDialog();
      return (
        <button
          type="button"
          onClick={() => {
            void dialog.alert("Pending").catch(rejected);
          }}
        >
          Open pending dialog
        </button>
      );
    }

    const view = render(
      <DialogProvider>
        <PendingDialog />
      </DialogProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Open pending dialog" }));
    expect(await screen.findByText("Pending")).toBeTruthy();
    view.unmount();

    await waitFor(() =>
      expect(rejected).toHaveBeenCalledWith(
        new Error("muibox: DialogProvider was unmounted"),
      ),
    );
  });
});
