import React from "react";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import SiteFooter from "../../app/components/SiteFooter";

describe("SiteFooter component", () => {
  afterEach(() => {
    jest.mocked(usePathname).mockReturnValue("/");
  });

  it("renders nothing on the home page ('/')", () => {
    jest.mocked(usePathname).mockReturnValue("/");
    const { container } = render(<SiteFooter />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders nothing on '/coming-soon'", () => {
    jest.mocked(usePathname).mockReturnValue("/coming-soon");
    const { container } = render(<SiteFooter />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the footer on other pages", () => {
    jest.mocked(usePathname).mockReturnValue("/about");
    render(<SiteFooter />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^shannon\s+muruli$/i })).toHaveAttribute("href", "/");
  });

  it("renders explore and company links", () => {
    jest.mocked(usePathname).mockReturnValue("/about");
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /about shannon/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /work with me/i })).toHaveAttribute("href", "/work-with-me");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: /privacy policy/i })).toHaveAttribute("href", "/privacy");
  });

  it("renders the Instagram social link", () => {
    jest.mocked(usePathname).mockReturnValue("/about");
    render(<SiteFooter />);
    const igLink = screen.getByRole("link", { name: /follow shannon muruli on instagram/i });
    expect(igLink).toHaveAttribute("href", "https://www.instagram.com/shannonmuruli/");
    expect(igLink).toHaveAttribute("target", "_blank");
  });
});
