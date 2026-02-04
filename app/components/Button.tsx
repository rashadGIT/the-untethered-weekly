import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export default function Button({ href, type = "button", variant = "primary", className = "", children, onClick }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full";
  
  const variants = {
    primary: "bg-[#FF6B35] text-white hover:bg-[#e85a2a] hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-[#161317] text-white hover:bg-[#2d2d3a] hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-[#161317] text-[#161317] hover:bg-[#161317] hover:text-white",
    ghost: "bg-transparent text-[#161317] hover:bg-gray-100"
  };

  const defaultClasses = `${baseStyles} ${variants[variant]} px-8 py-4 text-[13px] ${className}`;

  if (href) {
    return (
      <Link href={href} className={defaultClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={defaultClasses} onClick={onClick}>
      {children}
    </button>
  );
}