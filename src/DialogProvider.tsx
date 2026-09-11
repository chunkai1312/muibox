import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import AlertDialog from "./components/AlertDialog.tsx";
import ConfirmDialog from "./components/ConfirmDialog.tsx";
import PromptDialog from "./components/PromptDialog.tsx";
import DialogContext from "./DialogContext.ts";
import type {
  AlertDialogProps,
  ConfirmDialogProps,
  PromptDialogProps,
} from "./DialogContext.ts";

interface DialogProviderProps {
  children: ReactNode;
}

type Reject = (reason?: unknown) => void;

type AlertRequest = {
  id: number;
  type: "alert";
  props: AlertDialogProps;
  resolve: () => void;
  reject: Reject;
};

type ConfirmRequest = {
  id: number;
  type: "confirm";
  props: ConfirmDialogProps;
  resolve: (value: boolean) => void;
  reject: Reject;
};

type PromptRequest = {
  id: number;
  type: "prompt";
  props: PromptDialogProps;
  resolve: (value: string | number) => void;
  reject: Reject;
};

type DialogRequest = AlertRequest | ConfirmRequest | PromptRequest;

let nextId = 0;

function DialogProvider({ children }: DialogProviderProps) {
  // Dialogs are queued, never replaced. Each request keeps its own promise
  // handles, so a second call made while a dialog is still open waits its turn
  // instead of overwriting the first one and leaving its promise unsettled.
  const [queue, setQueue] = useState<DialogRequest[]>([]);
  // Set while the head dialog plays its leave transition; it is dropped from
  // the queue only after `onExited`, so the next one animates in cleanly.
  const [closing, setClosing] = useState(false);

  const current = queue[0] ?? null;

  const enqueue = useCallback((request: DialogRequest) => {
    setQueue((pending) => [...pending, request]);
  }, []);

  // Starts the leave transition of the head dialog. The promise is settled by
  // the caller, before this runs.
  const dismiss = useCallback(() => {
    setClosing(true);
  }, []);

  const handleExited = useCallback(() => {
    setClosing(false);
    setQueue((pending) => pending.slice(1));
  }, []);

  const alert = useCallback(
    (options: string | AlertDialogProps): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        enqueue({
          id: nextId++,
          type: "alert",
          // A bare string is shorthand for `{ message }`.
          props: typeof options === "string" ? { message: options } : options,
          resolve,
          reject,
        });
      }),
    [enqueue],
  );

  const confirm = useCallback(
    (options: string | ConfirmDialogProps): Promise<boolean> =>
      new Promise<boolean>((resolve, reject) => {
        enqueue({
          id: nextId++,
          type: "confirm",
          props: typeof options === "string" ? { message: options } : options,
          resolve,
          reject,
        });
      }),
    [enqueue],
  );

  const prompt = useCallback(
    (options: string | PromptDialogProps): Promise<string | number> =>
      new Promise<string | number>((resolve, reject) => {
        enqueue({
          id: nextId++,
          type: "prompt",
          props: typeof options === "string" ? { message: options } : options,
          resolve,
          reject,
        });
      }),
    [enqueue],
  );

  // Identity must stay stable: consumers read this straight off the context.
  const dialog = useMemo(
    () => ({ alert, confirm, prompt }),
    [alert, confirm, prompt],
  );
  const contextValue = useMemo(() => ({ dialog }), [dialog]);

  const handleAlertClose = (request: AlertRequest) => () => {
    request.resolve();
    dismiss();
  };

  const handleConfirmClose = (request: ConfirmRequest) => (value?: boolean) => {
    const { throwOnCancel = true } = request.props;

    if (value === true) {
      request.resolve(true);
    } else if (value === false && !throwOnCancel) {
      // Opted out of throwing: an explicit "cancel" is a `false` answer.
      request.resolve(false);
    } else {
      // Cancel button with throwOnCancel, or a backdrop/escape dismissal.
      request.reject();
    }

    dismiss();
  };

  const handlePromptClose =
    (request: PromptRequest) => (value: string | number | null) => {
      if (value === null || value === undefined) {
        request.reject();
      } else {
        request.resolve(value);
      }

      dismiss();
    };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {current?.type === "alert" && (
        <AlertDialog
          key={current.id}
          {...current.props}
          open={!closing}
          onClose={handleAlertClose(current)}
          onExited={handleExited}
        />
      )}
      {current?.type === "confirm" && (
        <ConfirmDialog
          key={current.id}
          {...current.props}
          open={!closing}
          onClose={handleConfirmClose(current)}
          onExited={handleExited}
        />
      )}
      {current?.type === "prompt" && (
        <PromptDialog
          key={current.id}
          {...current.props}
          open={!closing}
          onClose={handlePromptClose(current)}
          onExited={handleExited}
        />
      )}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
