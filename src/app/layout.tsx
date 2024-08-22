import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import Navbar from "@/components/Navbar";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Opinions",
  description: "Share your anonymous feedback.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className=" max-h-screen">
            <Navbar />
            <main className="relative z-20">
              {children}
              <Toaster />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

