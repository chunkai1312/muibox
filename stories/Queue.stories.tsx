import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DialogProvider, useDialog } from "../src";

function useLog() {
  const [lines, setLines] = useState<{ id: number; text: string }[]>([]);

  return {
    lines,
    reset: () => setLines([]),
    append: (text: string) =>
      setLines((current) => [
        ...current,
        { id: current.length + Date.now(), text },
      ]),
  };
}

function Log({ lines }: { lines: { id: number; text: string }[] }) {
  return lines.map((line) => (
    <Typography key={line.id} variant="body2">
      {line.text}
    </Typography>
  ));
}

/**
 * Dialogs requested while another one is still open are queued, not dropped.
 * Before queueing, a second request overwrote the first one's state and left
 * its promise forever unsettled — so the log below would simply stop.
 */
function OverlappingDemo() {
  const dialog = useDialog();
  const { lines, reset, append } = useLog();

  const fireAll = () => {
    reset();

    // All three are requested synchronously, before any of them is answered.
    dialog
      .alert("First — queued immediately.")
      .then(() => append("alert settled"))
      .catch(() => append("alert dismissed"));

    dialog
      .confirm("Second — this one waits its turn.")
      .then((value) => append(`confirm settled: ${value}`))
      .catch(() => append("confirm cancelled"));

    dialog
      .prompt("Third — still queued behind the other two.")
      .then((value) => append(`prompt settled: ${value}`))
      .catch(() => append("prompt cancelled"));
  };

  return (
    <Stack spacing={2} sx={{ m: 2, alignItems: "flex-start" }}>
      <Button variant="contained" onClick={fireAll}>
        Request three dialogs at once
      </Button>
      <Typography variant="body2" color="text.secondary">
        Each one should appear in turn, and every promise should settle.
      </Typography>
      <Log lines={lines} />
    </Stack>
  );
}

/**
 * A dialog opened from another dialog's `.then` used to appear and then vanish:
 * the first dialog's leave transition finished last and cleared every slot,
 * taking the freshly opened one with it. Each request now owns its own entry,
 * so the chained dialog survives.
 */
function ChainedDemo() {
  const dialog = useDialog();
  const { lines, reset, append } = useLog();

  const askThenConfirm = () => {
    reset();

    dialog
      .prompt({
        title: "Step 1",
        message: "Type an email address.",
        defaultValue: "someone@example.com",
        required: true,
      })
      .then((email) => {
        append(`prompt settled: ${email}`);
        // Opened from the callback, while the prompt is still animating out.
        return dialog.alert(`Step 2 — you typed: ${email}`);
      })
      .then(() => append("chained alert settled"))
      .catch(() => append("cancelled"));
  };

  return (
    <Stack spacing={2} sx={{ m: 2, alignItems: "flex-start" }}>
      <Button variant="contained" onClick={askThenConfirm}>
        Open a prompt, then chain an alert
      </Button>
      <Typography variant="body2" color="text.secondary">
        The second dialog must stay on screen, not flash and disappear.
      </Typography>
      <Log lines={lines} />
    </Stack>
  );
}

/**
 * The same three simultaneous requests as `OverlappingRequests`, but with the
 * provider in `stack` mode: instead of waiting in line they are layered on top
 * of each other, newest on top, under a single backdrop. Only the topmost is
 * reachable by keyboard, because every dialog traps focus — the same way nested
 * modals behave elsewhere.
 */
function StackDemo() {
  const dialog = useDialog();
  const { lines, reset, append } = useLog();

  const fireAll = () => {
    reset();

    dialog
      .alert("Bottom of the stack.")
      .then(() => append("alert settled"))
      .catch(() => append("alert dismissed"));

    dialog
      .confirm("Middle of the stack.")
      .then((value) => append(`confirm settled: ${value}`))
      .catch(() => append("confirm cancelled"));

    dialog
      .prompt("Top of the stack — answer this one first.")
      .then((value) => append(`prompt settled: ${value}`))
      .catch(() => append("prompt cancelled"));
  };

  return (
    <Stack spacing={2} sx={{ m: 2, alignItems: "flex-start" }}>
      <Button variant="contained" onClick={fireAll}>
        Request three dialogs at once
      </Button>
      <Typography variant="body2" color="text.secondary">
        All three are on screen at once, layered newest on top.
      </Typography>
      <Log lines={lines} />
    </Stack>
  );
}

/**
 * `dismissAll` tears down everything open and everything still waiting, in one
 * call, rejecting each promise the way a cancel would. The log shows that none
 * is left unanswered — which is the point: a dropped request would be a promise
 * nobody ever settles.
 */
function DismissAllDemo() {
  const dialog = useDialog();
  const { lines, reset, append } = useLog();

  const fireAll = () => {
    reset();

    dialog
      .alert("One.")
      .then(() => append("alert settled"))
      .catch(() => append("alert rejected"));

    dialog
      .confirm("Two.")
      .then((value) => append(`confirm settled: ${value}`))
      .catch(() => append("confirm rejected"));

    dialog
      .prompt("Three.")
      .then((value) => append(`prompt settled: ${value}`))
      .catch(() => append("prompt rejected"));

    // Give the dialogs a moment on screen before clearing them, so the effect
    // is visible rather than instantaneous.
    setTimeout(() => dialog.dismissAll(), 2000);
  };

  return (
    <Stack spacing={2} sx={{ m: 2, alignItems: "flex-start" }}>
      <Button variant="contained" onClick={fireAll}>
        Request three, then dismiss all after 2s
      </Button>
      <Typography variant="body2" color="text.secondary">
        All three promises should reject — none left hanging.
      </Typography>
      <Log lines={lines} />
    </Stack>
  );
}

const meta: Meta = {
  title: "Queue",
};

export default meta;

type Story = StoryObj;

export const OverlappingRequests: Story = {
  render: () => <OverlappingDemo />,
};

export const ChainedDialogs: Story = {
  render: () => <ChainedDemo />,
};

export const StackedDialogs: Story = {
  // Overrides the queue-mode provider that preview.tsx installs globally.
  render: () => (
    <DialogProvider mode="stack">
      <StackDemo />
    </DialogProvider>
  ),
};

/**
 * The opt-out: one backdrop per dialog instead of the default single one.
 * Compare against `StackedDialogs` — depth reads more clearly here, but the
 * page darkens once per layer and gets murky fast past two or three.
 */
export const StackedLayeredBackdrops: Story = {
  render: () => (
    <DialogProvider mode="stack" backdrop="each">
      <StackDemo />
    </DialogProvider>
  ),
};

export const DismissAll: Story = {
  render: () => <DismissAllDemo />,
};

export const DismissAllStacked: Story = {
  render: () => (
    <DialogProvider mode="stack">
      <DismissAllDemo />
    </DialogProvider>
  ),
};
