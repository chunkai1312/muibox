import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useDialog } from "../src";

/**
 * Dialogs requested while another one is still open are queued, not dropped.
 * Before queueing, a second request overwrote the first one's state and left
 * its promise forever unsettled — so the log below would simply stop.
 */
function QueueDemo() {
  const dialog = useDialog();
  const [log, setLog] = useState<{ id: number; text: string }[]>([]);

  const append = (text: string) =>
    setLog((lines) => [...lines, { id: lines.length + Date.now(), text }]);

  const fireAll = () => {
    setLog([]);

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
      {log.map((line) => (
        <Typography key={line.id} variant="body2">
          {line.text}
        </Typography>
      ))}
    </Stack>
  );
}

const meta: Meta<typeof QueueDemo> = {
  title: "Queue",
  component: QueueDemo,
};

export default meta;

type Story = StoryObj<typeof QueueDemo>;

export const OverlappingRequests: Story = {};
