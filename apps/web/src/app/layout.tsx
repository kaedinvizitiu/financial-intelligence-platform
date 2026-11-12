import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Financial Tracker",
  description: "A local-first, three-agent financial intelligence workspace.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
