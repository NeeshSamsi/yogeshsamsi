import { useCallback, useEffect, useRef, useState } from "react"

// One state machine for the "what happened after submit" concern that every
// form component previously juggled as `response`/`formError` (string |
// undefined) plus a boolean laundered through two ternaries
// (`!isSubmitted ? false : msg ? true : false`).
//
// RHF still owns `isSubmitting` / `isSubmitted` — this hook does not duplicate
// them. It only tracks the post-submit outcome and the auto-dismiss timer,
// which the four components each set with `setTimeout` and never cleared (F2):
// two submits < 5s apart clipped the first message, and an unmount inside the
// window set state on a dead tree.
export type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "error"; message: string }
  | { status: "done"; message: string }

const AUTO_DISMISS_MS = 5000

export function useFormSubmission() {
  const [state, setState] = useState<SubmitState>({ status: "idle" })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  // Clears the timer on unmount.
  useEffect(() => clearTimer, [clearTimer])

  const settle = useCallback(
    (next: SubmitState, autoDismiss: boolean) => {
      clearTimer()
      setState(next)
      if (autoDismiss) {
        timerRef.current = setTimeout(() => {
          timerRef.current = null
          setState({ status: "idle" })
        }, AUTO_DISMISS_MS)
      }
    },
    [clearTimer],
  )

  const start = useCallback(() => {
    clearTimer()
    setState({ status: "submitting" })
  }, [clearTimer])

  const succeed = useCallback(
    (message: string, autoDismiss = true) =>
      settle({ status: "done", message }, autoDismiss),
    [settle],
  )

  const fail = useCallback(
    (message: string, autoDismiss = true) =>
      settle({ status: "error", message }, autoDismiss),
    [settle],
  )

  const reset = useCallback(() => {
    clearTimer()
    setState({ status: "idle" })
  }, [clearTimer])

  return { state, start, succeed, fail, reset }
}
