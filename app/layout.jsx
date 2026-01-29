import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import CartProvider from "@/contexts/CartContext";
import Footer from "@/components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "1000",
  ],
});
export const metadata = {
  title: "Authentic Store",
  description: "an ecom store for Authentic",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased overflow-x-hidden`}>
        <CartProvider>
          <main className="min-h-screen flex flex-col">
            <Navbar />
            <div className="mt-10">{children}</div>
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
