import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TitleBar from "@/components/TitleBar";
import ClientOnly from "@/components/ClientOnly";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraVPN | Secure. Fast. Anonymous.",
  description: "Experience the next generation of online privacy with AuraVPN. State-of-the-art encryption and lightning-fast servers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning style={{ paddingTop: '32px' }}>
        <ClientOnly>
          <TitleBar />
        </ClientOnly>
        {children}
      </body>
    </html>
  );
}
