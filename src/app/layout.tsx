import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harshit's Portfolio",
  description: "A futuristic portfolio built with Next.js and Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
