import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { CartProvider } from "@/contexts/CartContext";

import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { TechStoreCompareProvider } from "@/contexts/TechStoreCompareContext";

const inter = Inter({ subsets: ["latin"] });

import { WhatsApp } from "@/components/common/whatsapp/WhatsApp";
import Popup from "@/components/common/popup/Popup";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <TechStoreCompareProvider>
            <QueryProvider>
              <CartProvider>
                <NextTopLoader color="#2462eb" />
                {children}
              </CartProvider>
              <WhatsApp />
              <Popup />
            </QueryProvider>
          </TechStoreCompareProvider>
        </AuthProvider>
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
