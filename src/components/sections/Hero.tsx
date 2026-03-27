"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const WaveformScene = dynamic(
  () => import("@/components/3d/WaveformScene"),
  { ssr: false }
);

export default function Hero() {
  return (
    <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-[#0F0F23]">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4338CA]/10 to-transparent" />
          </div>
        }
      >
        <WaveformScene />
      </Suspense>

      {/* Gradient overlays for text readability — pointer-events-none so mouse reaches the canvas */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#0F0F23]/60 via-transparent to-[#0F0F23] pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-radial-[ellipse_at_center] from-transparent via-transparent to-[#0F0F23]/80 pointer-events-none" />

      {/* Content — pointer-events-none on the wrapper, re-enable on interactive children */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#4338CA]/40 bg-[#4338CA]/10 backdrop-blur-sm mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-glow" />
            <span className="text-sm text-[#94A3B8]">
              Now in Early Access
            </span>
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span className="text-white">Find Your </span>
          <span className="text-gradient">Frequency</span>
        </motion.h1>

        <motion.p
          className="mt-6 text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Your music taste says more about you than your bio ever could.
          <br className="hidden sm:block" />
          <span className="text-white/80">
            Wavelength connects you with people who are truly on the same wavelength.
          </span>
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <Button size="lg" variant="primary">
            <span className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M2 12 C2 12, 5 4, 8 12 C11 20, 14 4, 17 12 C20 20, 22 12, 22 12" />
              </svg>
              Join the Wavelength
            </span>
          </Button>
          <Button size="lg" variant="outline">
            See How It Works
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
            animate={{ borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-[#22C55E] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
