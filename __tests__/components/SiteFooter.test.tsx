import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SiteFooter from "../../app/components/SiteFooter";

const mockUsePathname = jest.mocked(usePathname);

describe("SiteFooter", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the footer on non-coming-soon pages", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("returns null on the /coming-soon page", () => {
    mockUsePathname.mockReturnValue("/coming-soon");
    const { container } = render(<SiteFooter />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the SHANNON MURULI logo link", () => {
    render(<SiteFooter />);
    const logoLinks = screen.getAllByRole("link", { name: /shannon muruli/i });
    const logoLink = logoLinks.find((l) => l.getAttribute("href") === "/");
    expect(logoLink).toBeDefined();
  });

  it("renders the Instagram link with correct href and aria-label", () => {
    render(<SiteFooter />);
    const ig = screen.getByRole("link", { name: /instagram/i });
    expect(ig).toHaveAttribute("href", "https://www.instagram.com/shannonmuruli/");
    expect(ig).toHaveAttribute("target", "_blank");
    expect(ig).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders all Explore nav links", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /about shannon/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /work with me/i })).toHaveAttribute("href", "/work-with-me");
    expect(screen.getByRole("link", { name: /success stories/i })).toHaveAttribute("href", "/client-results");
    expect(screen.getByRole("link", { name: /free resources/i })).toHaveAttribute("href", "/resources");
  });

  it("renders all Company nav links", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: /terms of service/i })).toHaveAttribute("href", "/terms");
  });
});
