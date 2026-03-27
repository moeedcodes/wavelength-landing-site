"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-semibold rounded-full cursor-pointer transition-all duration-300 overflow-hidden";

  const variants = {
    primary:
      "bg-[#22C55E] text-[#0F0F23] hover:bg-[#16A34A] glow-green",
    secondary:
      "bg-[#4338CA] text-white hover:bg-[#6366F1] glow-purple",
    outline:
      "bg-transparent border-2 border-[#4338CA] text-white hover:bg-[#4338CA]/20",
  };

  const sizes = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg",
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/10 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  );
}
