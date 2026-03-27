"use client";

import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Compatibility from "@/components/sections/Compatibility";
import Community from "@/components/sections/Community";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Compatibility />
      <Community />
      <CTA />
      <Footer />
    </main>
  );
}
