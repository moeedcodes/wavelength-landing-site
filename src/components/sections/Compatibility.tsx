"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const CompatibilityOrb = dynamic(
  () => import("@/components/3d/CompatibilityOrb"),
  { ssr: false }
);

const dimensions = [
  {
    label: "Genre Match",
    value: 92,
    color: "#22C55E",
    description: "How much your genre preferences overlap",
  },
  {
    label: "Artist Overlap",
    value: 78,
    color: "#6366F1",
    description: "Shared artists in your libraries",
  },
  {
    label: "Era Preference",
    value: 85,
    color: "#4338CA",
    description: "Whether you gravitate to the same decades",
  },
  {
    label: "Rhythm & Energy",
    value: 91,
    color: "#22C55E",
    description: "Danceability, tempo, and energy alignment",
  },
  {
    label: "Discovery Score",
    value: 73,
    color: "#6366F1",
    description: "How similarly adventurous your listening is",
  },
];

function ScoreBar({
  label,
  value,
  color,
  description,
  delay,
}: {
  label: string;
  value: number;
  color: string;
  description: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="group cursor-pointer"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-white font-medium">{label}</span>
        <motion.span
          className="text-sm font-bold"
          style={{ color }}
          animate={{ scale: hovered ? 1.2 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {value}%
        </motion.span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        />
      </div>
      <motion.p
        className="text-xs text-[#94A3B8] mt-1 overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={hovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default function Compatibility() {
  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.value, 0) / dimensions.length
  );

  return (
    <section
      id="compatibility"
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F23] to-[#0F0F23]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4338CA]/3 rounded-full blur-[200px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="The Algorithm"
          title="Your compatibility, decoded"
          description="Wavelength doesn't just match on surface-level genre tags. We go deep into five dimensions of musical DNA."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-16">
          {/* 3D Orb */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Suspense
              fallback={
                <div className="w-full h-[400px] flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#4338CA] to-[#22C55E] animate-pulse" />
                </div>
              }
            >
              <CompatibilityOrb score={overallScore} />
            </Suspense>
            {/* Overall score overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <motion.div
                  className="text-6xl md:text-7xl font-bold text-gradient"
                  style={{ fontFamily: "var(--font-heading)" }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {overallScore}%
                </motion.div>
                <p className="text-sm text-[#94A3B8] mt-1">Overall Match</p>
              </div>
            </div>
          </motion.div>

          {/* Score Breakdown */}
          <div className="space-y-6">
            <motion.div
              className="bg-[#1A1A3E]/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3
                className="text-lg font-bold text-white mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Compatibility Breakdown
              </h3>
              <div className="space-y-5">
                {dimensions.map((dim, i) => (
                  <ScoreBar
                    key={dim.label}
                    {...dim}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
