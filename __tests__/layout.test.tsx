import React from "react";
import { render, screen } from "@testing-library/react";
import FooterAttribution from "../app/components/FooterAttribution";

describe("FooterAttribution", () => {
  it("renders the copyright notice with the current year", () => {
    render(<FooterAttribution />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders the AutoMagicly attribution text", () => {
    render(<FooterAttribution />);
    expect(screen.getByText(/powered by/i)).toBeInTheDocument();
  });

  it("renders the AutoMagicly link pointing to automagicly.ai", () => {
    render(<FooterAttribution />);
    const link = screen.getByRole("link", { name: "AutoMagicly" });
    expect(link).toHaveAttribute("href", "https://automagicly.ai/");
  });

  it("opens the AutoMagicly link in a new tab with noopener noreferrer", () => {
    render(<FooterAttribution />);
    const link = screen.getByRole("link", { name: "AutoMagicly" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
