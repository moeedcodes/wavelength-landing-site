"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center max-w-3xl mx-auto mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {label && (
        <motion.span
          className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.2em] uppercase text-[#22C55E] border border-[#22C55E]/30 rounded-full mb-6 bg-[#22C55E]/5"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {label}
        </motion.span>
      )}
      <h2
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
