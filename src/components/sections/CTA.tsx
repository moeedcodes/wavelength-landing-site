"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F23] to-[#0F0F23]" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#4338CA]/8 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#22C55E]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/5 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse-glow" />
            <span className="text-sm text-[#22C55E]">Limited Early Access</span>
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to find{" "}
            <span className="text-gradient">your frequency</span>?
          </h2>

          <p className="text-lg text-[#94A3B8] mb-10 max-w-xl mx-auto">
            Join the waitlist and be among the first to experience music-powered
            connections. Your soundtrack is waiting.
          </p>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-4 rounded-full bg-[#1A1A3E]/80 border border-white/10 text-white placeholder-[#94A3B8] outline-none focus:border-[#4338CA] focus:ring-1 focus:ring-[#4338CA] transition-all duration-300 text-sm"
            />
            <Button type="submit" size="lg">
              Get Early Access
            </Button>
          </motion.form>
        ) : (
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="text-xl font-semibold text-white" style={{ fontFamily: "var(--font-heading)" }}>
              You&apos;re on the list!
            </p>
            <p className="text-[#94A3B8] text-sm">
              We&apos;ll notify you when Wavelength launches. Get ready to find
              your frequency.
            </p>
          </motion.div>
        )}

        <motion.p
          className="mt-6 text-xs text-[#94A3B8]/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          No spam, ever. Just wavelength updates.
        </motion.p>
      </div>
    </section>
  );
}
