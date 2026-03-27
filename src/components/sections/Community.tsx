"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const testimonials = [
  {
    name: "Alex Chen",
    handle: "@alexlistens",
    avatar: "AC",
    text: "Wavelength connected me with someone who had the exact same obscure playlist taste. We've been sharing music daily for 3 months now.",
    score: 94,
  },
  {
    name: "Sarah Kim",
    handle: "@sarahvibes",
    avatar: "SK",
    text: "I've tried every social app out there. This is the first one where the connections feel real. Music compatibility is genuinely the best icebreaker.",
    score: 88,
  },
  {
    name: "Jordan Lee",
    handle: "@jordansound",
    avatar: "JL",
    text: "The QR code feature is genius. I printed mine on a sticker and put it on my laptop. Already matched with 12 people from my coworking space.",
    score: 91,
  },
  {
    name: "Maya Patel",
    handle: "@mayabeats",
    avatar: "MP",
    text: "My compatibility score with my best friend was 96%. Wavelength just scientifically confirmed what I already knew — we're soulmates.",
    score: 96,
  },
];

const stats = [
  { value: "10,000+", label: "Music lovers" },
  { value: "2.5M+", label: "Songs analyzed" },
  { value: "87%", label: "Avg. match satisfaction" },
  { value: "150K+", label: "Connections made" },
];

export default function Community() {
  return (
    <section id="community" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F23] via-[#111133] to-[#0F0F23]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#22C55E]/3 rounded-full blur-[200px]" />

      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          label="Community"
          title="Already on the wavelength"
          description="Join thousands of music lovers who've found their people through the power of shared taste."
        />

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-[#1A1A3E]/30 border border-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className="text-2xl md:text-3xl font-bold text-gradient"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-[#94A3B8] mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              className="group relative rounded-2xl border border-white/5 bg-[#1A1A3E]/30 backdrop-blur-sm p-6 hover:border-white/10 transition-all duration-500 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#4338CA] to-[#22C55E] flex items-center justify-center text-xs font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-white">
                      {testimonial.name}
                    </span>
                    <span className="text-xs text-[#94A3B8]">
                      {testimonial.handle}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className="fill-[#22C55E] text-[#22C55E]"
                      />
                    ))}
                    <span className="ml-2 text-xs text-[#22C55E] font-semibold">
                      {testimonial.score}% match
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
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
