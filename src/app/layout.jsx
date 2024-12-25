import "./globals.css";
import { Russo_One } from "next/font/google";

const russo = Russo_One({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

const title = "Pownloader - Ultimate Video Downloader";
const description =
  "Pownloader - The ultimate free video downloader for everyone. Download high-quality videos and photos from Instagram, Facebook, and TikTok with one click. Free, easy, and efficient!";

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
      { url: "/favicon-512x512-any.png", sizes: "512x512" },
      { url: "/favicon.svg" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  publisher: "Pownloader",
  verification: {
    google: "1Hibq62KV62bSjoXtQEEWNH7oArNJYkycmuyJ2yOaW4",
  },
  appleWebApp: {
    title: "Pownloader",
  },
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: "https://pownloader.pras.me/favicon.svg",
      width: 1200,
      height: 630,
    },
  },
  copyright: "© 2024 PRAS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}
