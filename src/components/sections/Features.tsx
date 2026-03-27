"use client";

import { motion } from "framer-motion";
import {
  Music,
  QrCode,
  BarChart3,
  Headphones,
  MessageCircle,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const features = [
  {
    icon: Music,
    title: "Spotify Integration",
    description:
      "Sync your account, import playlists, and let Wavelength decode your listening DNA. We analyze everything — from guilty pleasures to deep cuts.",
    color: "#22C55E",
    size: "large",
  },
  {
    icon: BarChart3,
    title: "Compatibility Scores",
    description:
      "See exactly how your taste aligns with others across genre, artist overlap, era, rhythm, and discovery habits.",
    color: "#6366F1",
    size: "small",
  },
  {
    icon: QrCode,
    title: "QR Code Sharing",
    description:
      "Generate unique QR codes to share playlists instantly — scan digitally or print them for the real world.",
    color: "#4338CA",
    size: "small",
  },
  {
    icon: Users,
    title: "User Clustering",
    description:
      "Get grouped with people who share your vibe. Our clustering algorithm finds your musical tribe by genre, artist, or even song popularity preferences.",
    color: "#22C55E",
    size: "large",
  },
  {
    icon: Headphones,
    title: "Music Playback",
    description:
      "Stream directly in-app with the full Spotify playback experience. Listen together in real time.",
    color: "#6366F1",
    size: "small",
  },
  {
    icon: MessageCircle,
    title: "Chat & Messaging",
    description:
      "Connect and chat with your music matches. Share tracks, react to songs, and build playlists together.",
    color: "#4338CA",
    size: "small",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F23] via-[#111133] to-[#0F0F23]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#22C55E]/3 rounded-full blur-[200px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-[#4338CA]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Features"
          title="Everything you need to find your people"
          description="Wavelength is built around the idea that music reveals who you really are. Here's how we make that happen."
        />

        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`group relative rounded-2xl border border-white/5 bg-[#1A1A3E]/30 backdrop-blur-sm p-8 hover:border-white/10 transition-all duration-500 cursor-pointer ${
                feature.size === "large" ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 50%, ${feature.color}08, transparent 60%)`,
                }}
              />

              {/* Corner accents on hover */}
              <div className="absolute top-0 left-0 w-16 h-px bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500" />
              <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-transparent via-white/0 to-transparent group-hover:via-white/20 transition-all duration-500" />

              <div className="relative z-10 flex items-start gap-6">
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                  style={{
                    background: `${feature.color}12`,
                    border: `1px solid ${feature.color}25`,
                  }}
                >
                  <feature.icon
                    size={22}
                    style={{ color: feature.color }}
                  />
                </div>

                <div className="flex-1">
                  <h3
                    className="text-lg font-bold text-white mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xl">
                    {feature.description}
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
