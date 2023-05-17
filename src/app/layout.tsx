import "./globals.css";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import * as config from "@/lib/config";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

const reckless = localFont({
  src: [
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/RecklessNeue/ttf/RecklessNeue-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-reckless",
});

const { title, description } = config.meta.home;

export const metadata = {
  metadataBase: new URL(config.url),
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description: config.meta.home.description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
  },
  twitter: {
    title,
    description,
    creator: config.twitterUsername,
    card: "summary",
  },
  themeColor: "#362009",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${reckless.variable} bg-lighter font-sans text-darker`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
