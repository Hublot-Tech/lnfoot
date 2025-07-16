import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import { Banner } from "@/components/layout/banner";
import Navbar from "@/components/layout/first-navbar";

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
