import { Footer } from "@/app/_home/footer";
import { HeroSection } from "@/app/_home/hero-section";
import { Navbar } from "@/app/_home/navbar";

import type { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: "ChatApp - Home",
  description: "ChatApp is a modern chat platform that allows you to connect and chat in real-time with friends, teammates, and loved ones.",
}
 

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 bg-card">
      <HeroSection />
    </main>
    <Footer />
  </div>
  );
}
