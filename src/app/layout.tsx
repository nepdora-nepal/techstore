import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { CartProvider } from "@/contexts/CartContext";

import { Toaster } from "sonner";
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ["latin"] });

import { siteConfigAPI } from "@/services/api/site-config";

export async function generateMetadata(): Promise<Metadata> {
  const config = await siteConfigAPI.getSiteConfig();

  return {
    title: config?.business_name || "SastoBazaar - Premium Shopping Experience",
    description: config?.business_description || "Your ultimate solution for managing sales and customer relationships with cutting-edge technology.",
    icons: {
      icon: config?.favicon || "",
    },
  };
}

import { WhatsApp } from "@/components/common/whatsapp/WhatsApp";
import Popup from "@/components/common/popup/Popup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <CartProvider>
            <NextTopLoader color="#6f57cfp" />
            {children}
          </CartProvider>
          <WhatsApp />
          <Popup />
        </QueryProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
