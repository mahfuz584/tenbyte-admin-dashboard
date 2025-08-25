import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tenbyte Admin Dashboard",
  description: "Admin dashboard for managing Tenbyte resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="max-w-7xl mx-auto w-full">
          <ReactQueryProvider>
            <NuqsAdapter>{children}</NuqsAdapter>
          </ReactQueryProvider>
        </div>
      </body>
    </html>
  );
}
