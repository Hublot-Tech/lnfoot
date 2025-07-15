import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layout/Footer";
import { Banner } from "@/components/Layout/Banner";
import Navbar from "@/components/Layout/FirstNavbar";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "LN Foot",
  description: "Luvnation Foot",
  icons: {
    icon: '/ln.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        <Banner/>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
