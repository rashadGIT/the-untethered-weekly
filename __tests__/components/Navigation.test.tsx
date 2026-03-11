import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import Navigation from "../../app/components/Navigation";

// usePathname is already mocked via __mocks__/next/navigation.ts
const mockUsePathname = jest.mocked(usePathname);

const EXPECTED_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work With Me", href: "/work-with-me" },
  { label: "Results", href: "/client-results" },
  { label: "Resources", href: "/resources" },
  { label: "FEARX", href: "/fearx" },
];

describe("Navigation component", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/");
  });

  // -----------------------------------------------------------------------
  // Link rendering
  // -----------------------------------------------------------------------
  describe("nav links", () => {
    it("renders all primary navigation links in the desktop nav", () => {
      render(<Navigation />);
      EXPECTED_NAV_LINKS.forEach(({ label }) => {
        // getAllByRole because the same link appears in both desktop and mobile markup
        const links = screen.getAllByRole("link", { name: label });
        expect(links.length).toBeGreaterThanOrEqual(1);
      });
    });

    it("renders the 'Join The Weekly' link", () => {
      render(<Navigation />);
      const weeklyLinks = screen.getAllByRole("link", { name: /join the weekly/i });
      expect(weeklyLinks.length).toBeGreaterThanOrEqual(1);
    });

    it("renders the SHANNON MURULI logo link pointing to /", () => {
      render(<Navigation />);
      const logoLink = screen.getByRole("link", { name: /shannon muruli/i });
      expect(logoLink).toHaveAttribute("href", "/");
    });
  });

  // -----------------------------------------------------------------------
  // Active link
  // -----------------------------------------------------------------------
  describe("active link highlighting", () => {
    it("marks the current page link with aria-current='page'", () => {
      mockUsePathname.mockReturnValue("/about");
      render(<Navigation />);
      const aboutLinks = screen.getAllByRole("link", { name: "About" });
      const activeLink = aboutLinks.find(
        (l) => l.getAttribute("aria-current") === "page"
      );
      expect(activeLink).toBeDefined();
    });

    it("does not set aria-current on non-active links", () => {
      mockUsePathname.mockReturnValue("/about");
      render(<Navigation />);
      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      homeLinks.forEach((link) => {
        expect(link).not.toHaveAttribute("aria-current");
      });
    });

    it("marks the root / link as active when on the homepage", () => {
      mockUsePathname.mockReturnValue("/");
      render(<Navigation />);
      const homeLinks = screen.getAllByRole("link", { name: "Home" });
      const activeLink = homeLinks.find(
        (l) => l.getAttribute("aria-current") === "page"
      );
      expect(activeLink).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // Mobile hamburger menu
  // -----------------------------------------------------------------------
  describe("mobile menu", () => {
    it("hides the mobile menu by default", () => {
      render(<Navigation />);
      expect(screen.queryByRole("region", { name: /mobile/i })).not.toBeInTheDocument();
      // The mobile menu div is not rendered when mobileMenuOpen is false
      const mobileMenu = document.getElementById("mobile-menu");
      expect(mobileMenu).not.toBeInTheDocument();
    });

    it("opens the mobile menu when the hamburger button is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      const hamburger = screen.getByRole("button", { name: /open menu/i });
      await user.click(hamburger);
      expect(document.getElementById("mobile-menu")).toBeInTheDocument();
    });

    it("changes hamburger aria-label to 'Close menu' when open", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      const hamburger = screen.getByRole("button", { name: /open menu/i });
      await user.click(hamburger);
      expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
    });

    it("sets aria-expanded='true' on the hamburger when menu is open", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      const hamburger = screen.getByRole("button", { name: /open menu/i });
      await user.click(hamburger);
      expect(screen.getByRole("button", { name: /close menu/i })).toHaveAttribute(
        "aria-expanded",
        "true"
      );
    });

    it("closes the mobile menu when the hamburger is clicked a second time", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      const hamburger = screen.getByRole("button", { name: /open menu/i });
      await user.click(hamburger);
      await user.click(screen.getByRole("button", { name: /close menu/i }));
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });

    it("closes the mobile menu when a nav link inside it is clicked", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      const mobileMenu = document.getElementById("mobile-menu")!;
      expect(mobileMenu).toBeInTheDocument();
      const aboutLink = within(mobileMenu).getByRole("link", { name: "About" });
      await user.click(aboutLink);
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });

    it("closes the mobile menu on Escape key press", async () => {
      const user = userEvent.setup();
      render(<Navigation />);
      await user.click(screen.getByRole("button", { name: /open menu/i }));
      expect(document.getElementById("mobile-menu")).toBeInTheDocument();
      await user.keyboard("{Escape}");
      expect(document.getElementById("mobile-menu")).not.toBeInTheDocument();
    });
  });
});
