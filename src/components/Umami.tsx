import Script from "next/script"

const WEBSITE_ID = "45d705f2-b44a-45cf-b94e-a8fb619b5fe0"

export default function Umami() {
  if (process.env.NODE_ENV !== "production") return null

  return (
    <>
      <Script src="/u/script.js" data-website-id={WEBSITE_ID} strategy="afterInteractive" />
      <Script
        src="/u/recorder.js"
        data-website-id={WEBSITE_ID}
        data-sample-rate="0.15"
        data-mask-level="moderate"
        data-max-duration="300000"
        strategy="afterInteractive"
      />
    </>
  )
}
