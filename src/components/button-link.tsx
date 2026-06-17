import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ className = "", variant = "primary", ...props }: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-[var(--mint)] text-[#07110c] hover:bg-white shadow-[0_0_32px_rgba(167,243,194,0.22)]",
    secondary:
      "border border-[var(--line)] bg-white/5 text-white hover:border-[var(--mint)] hover:bg-white/10",
    ghost: "text-[var(--mint)] hover:text-white",
  };

  return (
    <Link
      className={`inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
