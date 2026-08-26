# Tailwind 3 → 4 migration mapping (U8 / Solo todo 178)

Prepared by the visual-harness lane. This is the translation to apply, not a
restatement of the todo. Every claim below was checked against this
repository's actual source (`grep`, not memory) as of commit `7647b3c` on
`update-packages`. Confidence markers:

- **[VERIFIED - repo]**: confirmed by reading this codebase directly.
- **[VERIFIED - docs]**: confirmed against the package's own README/docs this
  session (via WebSearch/WebFetch - see links inline).
- **[INFERRED]**: based on Tailwind v4's documented behaviour / general
  knowledge, but not re-checked against a live doc page this session. Lower
  confidence than the two above - a human should skim the real docs for
  these before relying on them.
- **[UNVERIFIED - flagged in todo]**: genuinely unknown either way, carried
  forward from the todo's own caveat. Binary pass/fail only, at migration
  time.

No dependency was installed and no config file was touched to produce this -
it comes from reading `tailwind.config.js`, `postcss.config.js`, `globals.css`,
`components.json` and `src/**` as they exist today, plus package research.

---

## 1. `tailwind.config.js` → `@theme`

### Breakpoints - the highest-risk item **[VERIFIED - repo, INFERRED for v4 semantics]**

```css
@theme {
  --breakpoint-sm: 641px;
  --breakpoint-md: 769px;
  --breakpoint-lg: 1025px;
  --breakpoint-xl: 1281px;
  --breakpoint-2xl: 1537px;
  --breakpoint-3xl: 1921px;
}
```

The todo's warning that these sit under `extend.screens` and therefore
*merge* with Tailwind's defaults is correct for v3, but doesn't actually
create ambiguity here: all four of Tailwind's default breakpoint names
(`sm`/`md`/`lg`/`xl`/`2xl`) are being redefined with new values (not left to
merge in unchanged), and `3xl` doesn't exist in Tailwind's defaults at all -
it's a pure addition in both v3 and v4. So there's no case where a v3-default
value could leak through if a key were accidentally omitted; the risk is
purely transcription accuracy (copy the six numbers above exactly, all six,
or every breakpoint on every page shifts by a small but very noticeable
amount). **[INFERRED]** Tailwind v4's `@theme` namespace override is also
per-variable, not all-or-nothing - defining `--breakpoint-sm` only replaces
`sm`, it doesn't clear the whole `--breakpoint-*` namespace back to defaults
- so there's no need for a `--breakpoint-*: initial;` reset line before
these six.

This is exactly what Deliverable 1's visual harness screenshots at all four
required widths (375/768/1280/1920) are for: a single missed or mistyped
breakpoint value would shift every responsive class at that breakpoint, and
that is precisely the class of bug structural Playwright specs cannot see
but a screenshot diff will flag everywhere it applies at once.

### Colours **[VERIFIED - repo]**

```css
@theme {
  --color-darker: #362009;
  --color-dark: #222222;
  --color-light: #E9C493;
  --color-lighter: #F5E0CC;
}
```

Straightforward 1:1 rename (`colors.darker` → `--color-darker`, etc). These
four are the site's real palette - see the shadcn HSL section below for why
the *other* colours in `tailwind.config.js` (`background`, `foreground`,
`card`, `popover`, `primary`, `secondary`, `destructive`, `border`, `input`,
`ring`, `chart-1..5`) need less care than their volume in the config
suggests.

### Spacing **[VERIFIED - repo]**

```css
@theme {
  --spacing-col-outer: 6vw;
  --spacing-col-inner: 12vw;
}
```

Confirmed in **14 files** (matches the audit comment, not the original body's
implication of narrower use): `page.tsx` (both `(main)` and `(mail)`
variants), `not-found.tsx`, `about`, `academy`, `academy/terms`, `contact`,
`gallery`, `masterclass`, `[eventSlug]`, `still-interested`,
`welcome-updates`, `Footer.tsx`, `Navbar.tsx`, `Section.tsx`. `Section.tsx`
in particular means this spacing value is load-bearing on almost every page
section site-wide - get this one wrong and it's not a single page that
breaks, it's the horizontal rhythm of the entire site.

### Fonts **[VERIFIED - repo]**

```css
@theme {
  --font-sans: var(--font-montserrat), ui-sans-serif, system-ui, ...;
  --font-serif: var(--font-reckless), ui-serif, Georgia, ...;
}
```

`--font-montserrat` / `--font-reckless` are next/font CSS variables set on
`<body>` in `src/app/(main)/layout.tsx` (Google font + local `RecklessNeue`
files) - that wiring is untouched by this migration, only the Tailwind side
of the mapping changes. Carry the `defaultTheme.fontFamily.sans/serif`
fallback stacks forward explicitly, since v4 doesn't expose
`require("tailwindcss/defaultTheme")` for a CSS-first config - copy the
literal fallback font list rather than trying to reference it.

### Keyframes / animations **[VERIFIED - repo]**

```css
@theme {
  --animate-nav-show: nav 1000ms cubic-bezier(0.4, 0, 0.2, 1);
  --animate-nav-hide: nav 1000ms cubic-bezier(0.4, 0, 0.2, 1) 1 reverse;

  @keyframes nav {
    from { clip-path: inset(0 0 100% 0); }
    to   { clip-path: inset(0 0 0 0); }
  }
}
```

**Finding the todo missed:** `animate-nav-hide` is defined but **never
referenced anywhere in `src/`** - only `animate-nav-show` is used
(`Navbar.tsx:78`; the mobile nav closes by switching straight to `hidden`,
with no exit animation). Not a bug, just dead config - safe to carry both
forward unchanged for parity, or drop `nav-hide` as a small bonus cleanup if
whoever does the migration wants one, but either way it has zero visual
effect and the visual harness has nothing to catch here either way.

### `darkMode: ["class"]` → `@custom-variant dark` **[VERIFIED - repo + docs]**

```css
@custom-variant dark (&:where(.dark, .dark *));
```

**Finding the todo missed, and the more important one:** dark mode is
entirely unused in this codebase. `grep -rn "dark:" src` (excluding the
literal string `"dark"` and the `darker` colour name) turns up nothing, and
nothing anywhere adds/toggles a `.dark` class on any element. The
`.dark { ... }` block of shadcn HSL overrides in `globals.css:45-70` is dead
CSS today. This makes the dark-mode migration a zero-risk, zero-visual-effect
line to add for parity - but it also means it's a candidate to drop
entirely if the migration wants to shed dead weight, with no screenshot able
to tell the difference either way.

### `borderRadius` **[VERIFIED - repo]**

```css
@theme {
  --radius: 0.5rem;
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
```

Unlike most of the shadcn scaffolding here, this one is **live**:
`rounded-lg` (`DialogContent`, `sm:rounded-lg`) and `rounded-sm` (the
dialog's close button) both render inside the enrolment dialog, which the
visual harness captures open at every width.

---

## 2. shadcn HSL variables in `:root`

**[VERIFIED - repo]** Of the 13 base tokens plus 5 chart tokens defined in
`globals.css:18-43`, actual usage in `src/**` breaks down as:

| Token | Used in `src/` (bg-/text-/border-*) | Live? |
|---|---|---|
| `background` / `foreground` | 0 files directly - only via `globals.css`'s own `@apply bg-background text-foreground` on `body` | **Dead.** `layout.tsx` sets `bg-lighter text-darker` directly on the same `<body>` tag as ordinary utility classes; both rules are in the utilities-equivalent cascade layer at the same specificity, and `bg-lighter`/`text-darker` come later in source order, so they win. The shadcn background/foreground colours never paint. |
| `card`, `popover`, `primary`, `secondary`, `destructive`, `border`, `input`, `ring`, `chart-1..5` | 0 files | **Dead.** Every bordered element in this codebase (`border border-light`, `border-b border-darker`, etc.) sets its own colour explicitly, so the `border-border` default-color rule on `*` in `globals.css:77` never has anything to apply to. |
| `muted`, `accent` | 1 file: `src/components/ui/dialog.tsx:47` (`data-[state=open]:bg-accent data-[state=open]:text-muted-foreground` on the dialog's close/X button) | **Live.** This is the one place any shadcn HSL token actually paints pixels - the visual harness's `enrolment-dialog-open` screenshot exercises exactly this. |

Carrying the HSL variables into `@theme` (or leaving them as plain `:root`
custom properties referenced via `hsl(var(--x))`, which v4 still supports -
`@theme` is additive, not the only valid place for CSS variables) is low
risk regardless of approach, given only 2 of 18 tokens do anything visible.
The one thing worth being careful with, precisely because it's the one live
token: don't let `muted`/`accent` silently drop during the config rewrite.

---

## 3. The four JS plugins

| Plugin | Recommendation | Confidence |
|---|---|---|
| `@tailwindcss/forms` | `@plugin "@tailwindcss/forms";` in `globals.css` | **[INFERRED]** - officially documented v4-compatible legacy-plugin loading in Tailwind's own upgrade guide. Not independently exercised by this codebase's own inputs, though: every `FloatingLabelInput` across `AcademyRegistration.tsx`, `ContactForm.tsx`, `MailingList.tsx`, `MasterclassRegistration.tsx` explicitly sets `border-0` and `focus:ring-0`, overriding almost everything `@tailwindcss/forms`' base reset would otherwise apply. Low visual risk either way, but worth an explicit before/after look at one of these forms rather than assuming "the plugin loaded" is the same as "the plugin has no effect to check." |
| `@tailwindcss/typography` | `@plugin "@tailwindcss/typography";` | **[INFERRED]**, same basis as above. This one **is** clearly live: `prose` appears in **5 files**, not the 3 the todo body originally named - `welcome-updates/page.tsx`, `still-interested/page.tsx`, `academy/terms/page.tsx`, plus **`[eventSlug]/page.tsx`** and **`masterclass/page.tsx`**, both missing from the body (confirmed already in Solo comment 22; re-confirmed independently here). The visual harness screenshots `academy-terms`, `masterclass`, `welcome-updates`, `still-interested` as static pages and will capture `[eventSlug]` automatically once an event exists again (see the harness report) - so all five are covered once that page has real content. |
| `tailwindcss-animate` → `tw-animate-css` | Remove `tailwindcss-animate` from `plugins: []`; add `@import "tw-animate-css";` to `globals.css`. | **[VERIFIED - docs]** - fetched the package's own README this session: it is explicitly billed as "TailwindCSS v4.0 compatible replacement for `tailwindcss-animate`," and its install instructions are literally `@import "tw-animate-css";` in your CSS file. **Important correction to the todo's implied mechanism:** this is a **plain CSS import**, not a legacy JS plugin - do not load it via `@plugin`. It ships pure `@utility`/keyframe CSS, no JS plugin API involved, which is a meaningfully different (simpler, lower-risk) integration than the forms/typography plugins above. This is the animation library behind the enrolment dialog's enter/exit transitions (`data-[state=open]:animate-in ... fade-in-0 ... zoom-in-95 ... slide-in-from-top-[48%]` in `dialog.tsx:41`) - the exact utility class names (`animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*`) must exist under the new package with identical names, which the README's utility list suggests but wasn't individually diffed against this repo's exact classes this session. |
| `tailwind-hamburgers` | `@plugin "tailwind-hamburgers";` - genuinely unverified, test empirically. | **[UNVERIFIED - flagged in todo]**. Checked its npm page and its GitHub README directly this session: no mention of Tailwind v4 anywhere, no compatibility statement, no v4-related issues visible from the README. The todo's "verify rather than assume" stands exactly as written - I could not raise or lower confidence on this one with the tools available. This is the one item in the whole migration where the outcome is genuinely binary and unknowable in advance: the hamburger (`tham tham-e-spin tham-w-6`, `Navbar.tsx:63`) either renders or it doesn't. **This is exactly what the visual harness's `mobile-nav-open` screenshot (375px project) exists to catch** - it's the single interactive-state screenshot most likely to be the first thing to check after the real migration lands. |

---

## 4. Exact utility renames present in this codebase

Grepped directly (`grep -rnE` for word-bounded matches), not estimated. Several of the todo's counts don't survive contact with what the strings actually are:

| Utility | Todo's count | Actual live count | Detail |
|---|---|---|---|
| `shadow` (bare, v3 → `shadow-sm` in v4) | 4 | **0** | All 4 matching lines (`page.tsx:157`, `gallery/page.tsx:88`, `Navbar.tsx:32`, `dialog.tsx:41`) use `shadow-lg`/`shadow-md`/`shadow-xl` with a named colour opacity variant (e.g. `shadow-darker/40`), never the bare `shadow` utility. **`shadow-lg`/`-md`/`-xl` are not renamed in v4** - only bare `shadow` and `shadow-sm` shift. Nothing to change here. |
| `rounded` (bare, v3 → `rounded-sm` in v4) | 4 | **0 bare, but 1 real rename needed** | The 4 `rounded-*` hits are `rounded-full` (`page.tsx:166`, not renamed), `sm:rounded-lg` (`dialog.tsx:41`, not renamed), `rounded-sm` (`dialog.tsx:47` - **this one needs to become `rounded-xs`**), and two occurrences of `rounded-md` that are **inside a commented-out block** in `button.tsx:24-25` (dead code, not live). Net: exactly **one** live rename (`dialog.tsx:47`). |
| `flex-grow` → `grow` | 3 | **3, confirmed** | `page.tsx:81` (home hero), `academy/page.tsx:69`, `masterclass/page.tsx:71` - all three are the identical hero-flex-column pattern. Matches the todo exactly. |
| `blur` (bare, v3 → `blur-sm` in v4) | 1 | **0** | The one `blur` hit in the whole codebase is `gallery/page.tsx:104`: `placeholder="blur"` - a **next/image React prop value** (`placeholder` prop, blur-up placeholder mode), not a Tailwind CSS class at all. There is no `blur` (or any `blur-*`) Tailwind utility anywhere in `src/`. |
| `outline-none` | 0 | **1** | `dialog.tsx:47`: `focus:outline-none` on the dialog's close button, alongside its own `focus:ring-2 focus:ring-darker focus:ring-offset-2`. **The todo's own audit comment is wrong here** - it explicitly claims `outline-none 0`. In v4, `outline-none` is redefined to mean literal `outline-style: none` (no fallback), and the old "invisible but still present for forced-colors mode" behaviour moves to a new utility, `outline-hidden`. Practically: since this element already draws its own visible focus ring via `ring-2`, the *visual* result of leaving it as `outline-none` vs. correctly renaming to `outline-hidden` is identical in normal rendering - it only matters for Windows High-Contrast/forced-colors mode, which no pixel screenshot diff will ever catch. Worth fixing for correctness and accessibility parity, but it is a real blind spot of Deliverable 1: this is a case where the "todo missed it, but a screenshot wouldn't have caught it either" - flagging it here is the only net this catches it in. |
| `ring` default width 3px → 1px | "~90 occurrences" (body) / corrected to 9 (audit) | **9, confirmed - but the risk itself doesn't apply** | All 9 `ring`-family hits: 5 are `focus:ring-0` (`AcademyRegistration.tsx:216`, `MasterclassRegistration.tsx:230`, `ContactForm.tsx:168`, `ContactForm.tsx:186`, `MailingList.tsx:148` - all explicitly **zeroing out** the ring), and 4 are on the dialog close button (`ring-offset-darker`, `focus:ring-2`, `focus:ring-darker`, `focus:ring-offset-2` - `dialog.tsx:47`, all with **explicit widths/offsets**). **There is no bare `ring` utility anywhere in this codebase.** The v4 change that matters (`ring` alone defaulting to 1px instead of 3px) only affects code that uses the bare, width-less `ring` class - which this codebase does not do, anywhere. This is a stronger claim than the audit comment's "9 occurrences, still check them" - having verified what those 9 actually are, **the ring-width change has zero effect here**, full stop. Worth a screenshot check anyway (cheap, and it's free coverage from Deliverable 1's `form-input-focused` and `enrolment-dialog-open` states) but not worth scheduling time around. |

---

## 5. `components.json`

**[VERIFIED - repo]** Line 7, `"tailwind": { "config": "tailwind.config.js", ... }`, points at a file this migration deletes. Fix:

```diff
   "tailwind": {
-    "config": "tailwind.config.js",
     "css": "src/app/(main)/globals.css",
```

**[INFERRED]** shadcn's CLI (v2+) supports Tailwind v4 projects by detecting the absence of a `tailwind` config key and reading theme tokens from the CSS file's `@theme` block instead - so removing the line (not repointing it at something else) is the fix, not leaving it dangling. Confirm `npx shadcn add` still works post-migration; if the installed `shadcn` CLI version predates v4 support, that's a separate, unrelated-to-Tailwind upgrade.

---

## 6. Additional findings beyond the todo's scope

**[VERIFIED - repo]** `tailwind-merge`'s real consumer set is **3 files**, not 1: `src/components/Event.tsx`, `src/components/ui/button.tsx`, `src/components/ui/dialog.tsx` all import `cn()` from `src/lib/utils.ts`. Solo comment 16 names "the shadcn `button.tsx` variants (its only real consumer)" - `Event.tsx` (used to render each card in the homepage's "Upcoming events" grid) is a second real consumer that should also get a visual check once `tailwind-merge@3` lands, not just the button.

**[VERIFIED - repo]** `autoprefixer` removal (from `postcss.config.js` and `package.json` dependencies) has no visual-risk surface distinguishable from the Tailwind bump itself - v4 prefixes natively via Lightning CSS, so this is purely a build-pipeline change, not a class/value change. Nothing new for the visual harness to cover here specifically; it'll be caught (or not) by the same screenshots as everything else.

**[VERIFIED - repo, see harness report]** The event-detail page (`/[eventSlug]`) currently has **no live content to screenshot** - the last event in `src/data/events/` was deleted in November 2024, and none has been added since (`git log -- src/data/events`). The visual harness's `page: event-detail` test is written to discover a real internal-event slug from whatever's checked in at run time and skip itself with an explicit message if none exists (see the harness report) - it will NOT silently pass by hardcoding a fake slug, and it will start running for real automatically the moment an internal event exists in the CMS again, no code change required. Whoever runs the actual U8 migration should be aware this page's coverage is currently zero and cannot be manufactured without real (or deliberately seeded test) CMS content.

**[VERIFIED - repo]** `prettier-plugin-tailwindcss` is currently locked at `0.6.14` (not the `0.6.13` written in `package.json`'s range) - the target `0.8.x` mentioned in Solo comment 11 should be re-checked against whatever's actually latest at migration time rather than assumed.
