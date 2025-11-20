import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A11y Friend - Accessibility Companion",
  description: "Your accessibility testing and management companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
