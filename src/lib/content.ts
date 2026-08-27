import { cache } from "react"

import type {
  Entry,
  EntryWithResolvedLinkedFiles,
} from "@keystatic/core/reader"

import keystaticConfig from "@/../keystatic.config"
import reader from "@/lib/keystatic"

type Singletons = NonNullable<typeof keystaticConfig.singletons>
type SingletonName = keyof Singletons

const contentNotFound = (name: string): never => {
  throw new Error(`Keystatic Content Not Found - ${name}`)
}

// Memoised for the render pass so the paired reads every route does - once in
// `generateMetadata`, once in the component - collapse to a single Keystatic
// read. These routes are statically generated, so this saves build-time work,
// not per-request work; the real win is that "read this singleton or fail" now
// has one owner instead of 30 hand-written null checks.
//
// The cache key deliberately includes `resolveLinkedFiles`: a resolved and an
// unresolved read of the same singleton are *different* documents, and letting
// them share a cache entry hands an unresolved document to a caller that needs
// the resolved one - which blanks the page body (e.g. /academy/terms,
// /masterclass).
const readSingletonCached = cache(
  async (name: SingletonName, resolveLinkedFiles: boolean) => {
    const singleton = reader.singletons[name]
    const entry = resolveLinkedFiles
      ? await singleton.read({ resolveLinkedFiles: true })
      : await singleton.read()
    return entry ?? contentNotFound(name)
  },
)

/**
 * Read a Keystatic singleton, memoised per render pass, throwing the one
 * standard `Keystatic Content Not Found - <name>` error when it is missing.
 */
export function readSingleton<N extends SingletonName>(
  name: N,
): Promise<Entry<Singletons[N]>>
export function readSingleton<N extends SingletonName>(
  name: N,
  opts: { resolveLinkedFiles: true },
): Promise<EntryWithResolvedLinkedFiles<Singletons[N]>>
export function readSingleton<N extends SingletonName>(
  name: N,
  opts?: { resolveLinkedFiles?: boolean },
) {
  return readSingletonCached(name, opts?.resolveLinkedFiles ?? false)
}
