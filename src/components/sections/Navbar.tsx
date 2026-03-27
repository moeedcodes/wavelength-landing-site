"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Compatibility", href: "#compatibility" },
  { label: "Community", href: "#community" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0F0F23]/80 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4338CA] to-[#22C55E] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M2 12 C2 12, 5 4, 8 12 C11 20, 14 4, 17 12 C20 20, 22 12, 22 12" />
              </svg>
            </div>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Wavelength
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <Button size="sm">Get Early Access</Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0F0F23]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-2xl text-white cursor-pointer"
                style={{ fontFamily: "var(--font-heading)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <Button onClick={() => setMobileOpen(false)}>Get Early Access</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
