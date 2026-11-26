import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import MyProvider from "./_components/MyProvider/MyProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/next-auth/authOptions";
import CartContextProvider from "@/context/CartContext";
import WishlistContextProvider from "@/context/WishlistContext";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" }); 
import TopBar from "./_components/TopBar/TopBar";
import FeaturesStrip from "./_components/FeaturesStrip/FeaturesStrip"; 
import { getAllCategories } from "@/api/services/categories.service";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "FreshCart", template: "%s | FreshCart" },
  description: "FreshCart e-commerce store",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions); 
  const categories = await getAllCategories();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <MyProvider session={session}> 
          <CartContextProvider>
  <WishlistContextProvider>
    <TopBar />
    <Navbar categories={categories ?? []} />

    {children}

    <Toaster />

    <FeaturesStrip />
    <Footer />
  </WishlistContextProvider>
</CartContextProvider>
        </MyProvider>
      </body>
    </html>
  );
}