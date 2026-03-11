import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../app/components/Button";

describe("Button component", () => {
  // -----------------------------------------------------------------------
  // Element type
  // -----------------------------------------------------------------------
  describe("element type", () => {
    it("renders an <a> tag when the href prop is provided", () => {
      render(<Button href="/about">Learn More</Button>);
      const el = screen.getByRole("link", { name: /learn more/i });
      expect(el).toBeInTheDocument();
      expect(el.tagName).toBe("A");
      expect(el).toHaveAttribute("href", "/about");
    });

    it("renders a <button> tag when no href prop is provided", () => {
      render(<Button>Click Me</Button>);
      const el = screen.getByRole("button", { name: /click me/i });
      expect(el).toBeInTheDocument();
      expect(el.tagName).toBe("BUTTON");
    });

    it("renders the correct button type attribute", () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("defaults to type='button' when no type prop is given", () => {
      render(<Button>Default</Button>);
      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });
  });

  // -----------------------------------------------------------------------
  // Variant classes
  // -----------------------------------------------------------------------
  describe("variant classes", () => {
    it("applies primary variant background colour", () => {
      render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-[#a08216]");
    });

    it("applies secondary variant background colour", () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-[#161317]");
    });

    it("applies outline variant border", () => {
      render(<Button variant="outline">Outline</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("border-2");
      expect(btn).toHaveClass("border-[#161317]");
    });

    it("applies ghost variant transparent background", () => {
      render(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-transparent");
    });

    it("defaults to primary variant", () => {
      render(<Button>Default Variant</Button>);
      expect(screen.getByRole("button")).toHaveClass("bg-[#a08216]");
    });
  });

  // -----------------------------------------------------------------------
  // Disabled state
  // -----------------------------------------------------------------------
  describe("disabled state", () => {
    it("sets the disabled attribute on a <button>", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies opacity and cursor-not-allowed classes when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      const btn = screen.getByRole("button");
      expect(btn).toHaveClass("opacity-50");
      expect(btn).toHaveClass("cursor-not-allowed");
    });

    it("sets aria-disabled on an <a> link when disabled", () => {
      render(
        <Button href="/test" disabled>
          Disabled Link
        </Button>
      );
      expect(screen.getByRole("link")).toHaveAttribute("aria-disabled", "true");
    });
  });

  // -----------------------------------------------------------------------
  // Props forwarding
  // -----------------------------------------------------------------------
  describe("prop forwarding", () => {
    it("applies a custom className on top of base styles", () => {
      render(<Button className="extra-class">Styled</Button>);
      expect(screen.getByRole("button")).toHaveClass("extra-class");
    });

    it("forwards aria-label", () => {
      render(<Button aria-label="Subscribe now">Subscribe</Button>);
      expect(screen.getByRole("button", { name: "Subscribe now" })).toBeInTheDocument();
    });

    it("calls onClick handler when clicked", async () => {
      const user = userEvent.setup();
      const handler = jest.fn();
      render(<Button onClick={handler}>Click</Button>);
      await user.click(screen.getByRole("button"));
      expect(handler).toHaveBeenCalledTimes(1);
    });

    it("sets rel='noopener noreferrer' on external links", () => {
      render(
        <Button href="https://example.com" target="_blank">
          External
        </Button>
      );
      expect(screen.getByRole("link")).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("renders children text correctly", () => {
      render(<Button>Subscribe to Newsletter</Button>);
      expect(screen.getByText("Subscribe to Newsletter")).toBeInTheDocument();
    });
  });
});
