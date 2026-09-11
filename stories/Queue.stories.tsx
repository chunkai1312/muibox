import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDialog } from "../src";

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
