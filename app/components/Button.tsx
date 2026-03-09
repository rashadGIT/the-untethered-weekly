import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
  disabled?: boolean;
  target?: string;
}

export default function Button({ href, type = "button", variant = "primary", className = "", children, onClick, "aria-label": ariaLabel, disabled, target }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a08216]";

  const variants = {
    primary: "bg-[#a08216] text-white hover:bg-[#7d6611] hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-[#161317] text-white hover:bg-[#2d2d3a] hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-[#161317] text-[#161317] hover:bg-[#161317] hover:text-white",
    ghost: "bg-transparent text-[#161317] hover:bg-gray-100"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";
  const defaultClasses = `${baseStyles} ${variants[variant]} px-8 py-4 text-[13px] ${disabledStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={defaultClasses} aria-label={ariaLabel} aria-disabled={disabled} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={defaultClasses} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  );
}
