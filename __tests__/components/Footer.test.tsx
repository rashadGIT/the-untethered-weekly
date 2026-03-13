import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../../app/components/Footer";

describe("Footer component", () => {
  // -----------------------------------------------------------------------
  // Brand
  // -----------------------------------------------------------------------
  describe("brand section", () => {
    it("renders the Shannon Muruli brand name", () => {
      render(<Footer />);
      expect(screen.getByText("Shannon Muruli")).toBeInTheDocument();
    });

    it("renders the tagline", () => {
      render(<Footer />);
      expect(screen.getByText(/courage coach/i)).toBeInTheDocument();
    });

    it("renders the copyright notice with the current year", () => {
      render(<Footer />);
      const year = new Date().getFullYear().toString();
      expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Navigation links
  // -----------------------------------------------------------------------
  describe("navigation links", () => {
    it("renders a link to the home page", () => {
      render(<Footer />);
      const link = screen.getByRole("link", { name: "Home" });
      expect(link).toHaveAttribute("href", "/");
    });

    it("renders a link to the about page", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    });

    it("renders a link to the work with me page", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: "Work With Me" })).toHaveAttribute("href", "/work-with-me");
    });

    it("renders a link to client results", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: "Client Results" })).toHaveAttribute("href", "/client-results");
    });

    it("renders a link to the contact page", () => {
      render(<Footer />);
      expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    });
  });

  // -----------------------------------------------------------------------
  // Social / external links
  // -----------------------------------------------------------------------
  describe("social links", () => {
    it("renders the Instagram link", () => {
      render(<Footer />);
      const link = screen.getByRole("link", { name: "Instagram" });
      expect(link).toHaveAttribute("href", "https://www.instagram.com/shannonmuruli/");
    });

    it("renders the Facebook link", () => {
      render(<Footer />);
      const link = screen.getByRole("link", { name: "Facebook" });
      expect(link).toHaveAttribute("href", "https://www.facebook.com/shannonmuruli/");
    });

    it("renders the newsletter link", () => {
      render(<Footer />);
      const link = screen.getByRole("link", { name: "Newsletter" });
      expect(link).toHaveAttribute("href", "https://www.theuntetheredweekly.com/");
    });

    it("opens external links in a new tab", () => {
      render(<Footer />);
      const external = [
        screen.getByRole("link", { name: "Instagram" }),
        screen.getByRole("link", { name: "Facebook" }),
        screen.getByRole("link", { name: "Newsletter" }),
      ];
      external.forEach((link) => {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  // -----------------------------------------------------------------------
  // Accessibility
  // -----------------------------------------------------------------------
  describe("accessibility", () => {
    it("renders a <footer> landmark element", () => {
      render(<Footer />);
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });
});
