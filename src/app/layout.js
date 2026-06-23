import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Flexura — Fitness & Gym Management Platform",
  description: "Discover fitness classes, book premium sessions, and track your fitness journey with expert trainers.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${inter.variable} h-full antialiased bg-zinc-950 text-white`}
    >
      <body className="min-h-full flex flex-col font-sans">

        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />
        <Toaster />
      </body>
    </html>
  );
}