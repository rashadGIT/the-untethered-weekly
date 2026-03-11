import React from "react";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
  "aria-disabled"?: boolean;
  "aria-current"?: React.AriaAttributes["aria-current"];
  target?: string;
  rel?: string;
  onClick?: () => void;
}

// Minimal next/link mock that renders a plain <a> tag
const Link = ({ href, children, ...props }: LinkProps) => (
  <a href={href} {...props}>
    {children}
  </a>
);

export default Link;
