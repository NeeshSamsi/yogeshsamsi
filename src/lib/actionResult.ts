// One result contract for every form server action (F3). Before this, the four
// actions disagreed: contact + mailing-list threw on failure, while academy +
// masterclass returned `{ success: false }`. Every client then re-derived
// success differently. Actions now return an ActionResult and clients test
// `res.data?.ok` and nothing else.
export type ActionResult =
  | { ok: true; message?: string; redirect?: string }
  | { ok: false; message: string }
