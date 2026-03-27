"use client";

import { motion } from "framer-motion";
import { Music, Users, Zap } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  {
    icon: Music,
    number: "01",
    title: "Connect Spotify",
    description:
      "Sync your Spotify account and let Wavelength analyze your listening DNA — genres, artists, eras, rhythm preferences, and discovery habits.",
    color: "#22C55E",
  },
  {
    icon: Users,
    number: "02",
    title: "Discover Matches",
    description:
      "Our algorithm calculates music compatibility scores between you and thousands of others. See who truly vibes on your wavelength.",
    color: "#6366F1",
  },
  {
    icon: Zap,
    number: "03",
    title: "Start Vibing",
    description:
      "Connect, chat, share playlists, and explore new music together. The best conversations start with the right soundtrack.",
    color: "#4338CA",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F23] via-[#0F0F23] to-[#0F0F23]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4338CA]/5 rounded-full blur-[128px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="How It Works"
          title="Three steps to your frequency"
          description="Getting started is simple. Connect your Spotify, discover your matches, and start vibing."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-white/10 to-transparent z-0" />
              )}

              <div className="relative bg-[#1A1A3E]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-all duration-500 group-hover:bg-[#1A1A3E]/80 cursor-pointer">
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${step.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}
                    >
                      <step.icon size={24} style={{ color: step.color }} />
                    </div>
                    <span
                      className="text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
