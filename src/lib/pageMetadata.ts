import type { Metadata } from "next"

// The page-level metadata block that every route was emitting by hand. Four
// routes (about, gallery, contact, event pages) copied an identical
// title/description + Open Graph + Twitter + canonical block varying only by
// path; three more (academy, masterclass, academy terms) had drifted to
// title + description alone and shipped no OG/Twitter tags at all. This gives
// all of them the full block from one place.
//
// `path` is the route's absolute path from the site root, e.g. "/about" or
// "/". `metadataBase` (set in the root layout) turns it into an absolute URL.
export default function pageMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
    },
    alternates: {
      canonical: path,
    },
  }
}
