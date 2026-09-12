import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

/**
 * How simultaneous dialog requests are presented.
 *
 * - `queue` shows one at a time, in request order; the next one opens once the
 *   current is answered.
 * - `stack` shows them layered on top of each other, newest on top, the way
 *   nested modals behave in most UIs. Only the topmost one is reachable by
 *   keyboard, since each dialog traps focus.
 *
 * Either way no request is dropped and every promise settles.
 */
export type DialogMode = "queue" | "stack";

/**
 * How backdrops are drawn in `stack` mode, where several dialogs are on screen
 * at once.
 *
 * - `topmost` (default) draws a single backdrop, behind the top dialog only, so
 *   the dimming stays constant however deep the stack goes.
 * - `each` gives every dialog its own. Depth reads more clearly, at the cost of
 *   the page getting very dark past two or three.
 *
 * Ignored in `queue` mode, where only one dialog is ever mounted.
 */
export type BackdropMode = "each" | "topmost";

interface DialogProviderProps {
  children: ReactNode;
  mode?: DialogMode;
  backdrop?: BackdropMode;
}

type Reject = (reason?: unknown) => void;

type RequestBase = {
  id: number;
  // Flipped to false to play the leave transition; the entry is removed from
  // state only after `onExited`.
  open: boolean;
};

type AlertRequest = RequestBase & {
  type: "alert";
  props: AlertDialogProps;
  resolve: () => void;
  reject: Reject;
};

type ConfirmRequest = RequestBase & {
  type: "confirm";
  props: ConfirmDialogProps;
  resolve: (value: boolean) => void;
  reject: Reject;
};

type PromptRequest = RequestBase & {
  type: "prompt";
  props: PromptDialogProps;
  resolve: (value: string | number) => void;
  reject: Reject;
};

type DialogRequest = AlertRequest | ConfirmRequest | PromptRequest;

let nextId = 0;

function DialogProvider({
  children,
  mode = "queue",
  backdrop = "topmost",
}: DialogProviderProps) {
  // Requests are kept, never replaced. Each one holds its own promise handles,
  // so a second call made while a dialog is still open waits its turn instead
  // of overwriting the first and leaving its promise unsettled.
  const [requests, setRequests] = useState<DialogRequest[]>([]);

  const enqueue = useCallback((request: DialogRequest) => {
    setRequests((pending) => [...pending, request]);
  }, []);

  // Starts the leave transition. The promise is settled by the caller, before
  // this runs.
  const dismiss = useCallback((id: number) => {
    setRequests((pending) =>
      pending.map((request) =>
        request.id === id ? { ...request, open: false } : request,
      ),
    );
  }, []);

  const forget = useCallback((id: number) => {
    setRequests((pending) => pending.filter((request) => request.id !== id));
  }, []);

  // Mirrors `requests` so dismissAll can read them without the state updater
  // having to reject promises, which would be a side effect inside a function
  // React is free to call twice.
  const requestsRef = useRef(requests);
  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  const alert = useCallback(
    (options: string | AlertDialogProps): Promise<void> =>
      new Promise<void>((resolve, reject) => {
        enqueue({
          id: nextId++,
          open: true,
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
          open: true,
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
          open: true,
          type: "prompt",
          props: typeof options === "string" ? { message: options } : options,
          resolve,
          reject,
        });
      }),
    [enqueue],
  );

  const dismissAll = useCallback(() => {
    const pending = requestsRef.current;
    pending.forEach((request) => request.reject());

    // Only mounted dialogs can play a leave transition and report `onExited`.
    // The ones still waiting their turn are never mounted, so they are dropped
    // outright — leaving them in state would strand them closed and unanswered.
    const mounted = mode === "stack" ? pending.length : Math.min(1, pending.length);
    // The spread is deliberate: these are state objects, and mutating them in
    // place would break React's change detection.
    setRequests(
      // oxlint-disable-next-line oxc/no-map-spread
      pending.slice(0, mounted).map((request) => ({ ...request, open: false })),
    );
  }, [mode]);

  // Identity must stay stable: consumers read this straight off the context.
  const dialog = useMemo(
    () => ({ alert, confirm, prompt, dismissAll }),
    [alert, confirm, prompt, dismissAll],
  );
  const contextValue = useMemo(() => ({ dialog }), [dialog]);

  const handleAlertClose = (request: AlertRequest) => () => {
    request.resolve();
    dismiss(request.id);
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

    dismiss(request.id);
  };

  const handlePromptClose =
    (request: PromptRequest) => (value: string | number | null) => {
      if (value === null || value === undefined) {
        request.reject();
      } else {
        request.resolve(value);
      }

      dismiss(request.id);
    };

  // In queue mode only the head is mounted, so the next one enters cleanly once
  // the current has finished leaving. In stack mode they are all mounted at
  // once and MUI layers them in mount order.
  const visible = mode === "stack" ? requests : requests.slice(0, 1);

  // With one backdrop per dialog the dimming compounds, so `topmost` keeps only
  // the last one's. Anything still leaving is skipped, so the remaining backdrop
  // never belongs to a dialog on its way out.
  const backdropOwner = visible.findLast((request) => request.open)?.id;
  const hideBackdropFor = (request: DialogRequest) =>
    backdrop === "topmost" && request.id !== backdropOwner;

  const render = (request: DialogRequest) => {
    switch (request.type) {
      case "alert":
        return (
          <AlertDialog
            key={request.id}
            {...request.props}
            open={request.open}
            onClose={handleAlertClose(request)}
            onExited={() => forget(request.id)}
            hideBackdrop={hideBackdropFor(request)}
          />
        );
      case "confirm":
        return (
          <ConfirmDialog
            key={request.id}
            {...request.props}
            open={request.open}
            onClose={handleConfirmClose(request)}
            onExited={() => forget(request.id)}
            hideBackdrop={hideBackdropFor(request)}
          />
        );
      case "prompt":
        return (
          <PromptDialog
            key={request.id}
            {...request.props}
            open={request.open}
            onClose={handlePromptClose(request)}
            onExited={() => forget(request.id)}
            hideBackdrop={hideBackdropFor(request)}
          />
        );
      default: {
        // Unreachable, and a compile error the day a new dialog type is added
        // without a branch here.
        const exhaustive: never = request;
        return exhaustive;
      }
    }
  };

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      {visible.map(render)}
    </DialogContext.Provider>
  );
}

export default DialogProvider;
