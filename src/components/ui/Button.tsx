"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary border-2 border-primary-active text-secondary hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "bg-secondary text-text-inverse hover:bg-secondary-hover active:bg-secondary-active",
  outline:
    "bg-transparent border border-border text-text-primary hover:border-secondary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-5 py-3 text-base rounded-lg",
  lg: "px-6 py-4 text-lg rounded-full",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold tracking-tight cursor-pointer transition-colors",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
