import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IRIS | Permanent Makeup Studio",
  description: "Discover IRIS Permanent Makeup Studio in Jersey City. Explore the beauty edit and connect with the studio for a consultation.",
  metadataBase: new URL("https://iris-pmu-demo.local")
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "light dark" };
const themeInitializer = `(function(){try{var t=localStorage.getItem('iris-theme');document.documentElement.dataset.theme=t==='dark'||(t!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){document.documentElement.dataset.theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script id="iris-theme-init" dangerouslySetInnerHTML={{ __html: themeInitializer }} /></head><body>{children}</body></html>;
}
