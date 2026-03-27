"use client";

import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "How It Works", "Pricing", "FAQ"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies"],
  },
];

const socialLinks = [
  {
    name: "Twitter",
    path: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
  },
  {
    name: "Instagram",
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  },
  {
    name: "TikTok",
    path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.93a8.22 8.22 0 0 0 4.8 1.53V7.05a4.85 4.85 0 0 1-1.04-.36z",
  },
  {
    name: "Spotify",
    path: "M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.076-.495 9.712 1.115a.623.623 0 0 1 .207.857zm1.224-2.719a.779.779 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.519.781.781 0 0 1 .52-.972c3.632-1.102 8.147-.568 11.234 1.329a.78.78 0 0 1 .256 1.071zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.934.934 0 1 1-.543-1.79c3.533-1.072 9.404-.865 13.115 1.338a.934.934 0 1 1-.954 1.612z",
  },
];

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4338CA] to-[#22C55E] flex items-center justify-center">
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
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-xs mb-6">
              Music is universal. Sharing it reveals who you really are.
              Find your people through the power of shared taste.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/5 flex items-center justify-center hover:bg-[#4338CA]/20 hover:border-[#4338CA]/30 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#94A3B8"
                  >
                    <path d={social.path} />
                  </svg>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94A3B8]/60">
            &copy; {new Date().getFullYear()} Wavelength. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8]/40">
            Made with music and code.
          </p>
        </div>
      </div>
    </footer>
  );
}
