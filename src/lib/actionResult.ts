// One result contract for every form server action (F3). Before this, the four
// actions disagreed: contact + mailing-list threw on failure, while academy +
// masterclass returned `{ success: false }`. Every client then re-derived
// success differently. Actions now return an ActionResult and clients test
// `res.data?.ok` and nothing else.
//
// `result` is only set on a genuine outcome, never on the honeypot/too-fast
// bot-decoy path (src/lib/botCheck.ts) - the fake success returned there
// omits it on purpose, so the client can fire an analytics event only when
// `result` is present rather than on `ok` alone.
export type ActionResult<TResult extends string = never> =
  | { ok: true; message?: string; redirect?: string; result?: TResult }
  | { ok: false; message: string }
