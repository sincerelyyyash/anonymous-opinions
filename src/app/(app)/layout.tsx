import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anonymous Opinions",
  description: "Send true feedback Anonymously",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <div className="relative z-10"> */}
        {/*   <Navbar /> */}
        {/* </div> */}
        <main className="relative z-0">
          {children}
        </main>
      </body>
    </html>
  );
}

