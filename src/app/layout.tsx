import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

// Fetching the futuristic 'Orbitron' font from Google Fonts
const orbitron = Orbitron({ 
  subsets: ["latin"],
  weight: ['400', '500', '700', '900'] 
});

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
      <body className={orbitron.className}>{children}</body>
    </html>
  );
}
