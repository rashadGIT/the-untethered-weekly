import React from "react";
import { render, screen } from "@testing-library/react";
import LegacyHomePage from "../../app/components/LegacyHomePage";

// LegacyHomePage is dormant (kept for possible future restoration, see app/page.tsx).
// This is a smoke test to keep it from silently breaking and to exercise its render output.
describe("LegacyHomePage component", () => {
  it("renders without crashing", () => {
    render(<LegacyHomePage />);
  });

  it("renders the hero heading", () => {
    render(<LegacyHomePage />);
    expect(screen.getByRole("heading", { level: 1, name: /become an\s*untethered/i })).toBeInTheDocument();
  });

  it("renders the newsletter section", () => {
    render(<LegacyHomePage />);
    expect(screen.getByRole("heading", { name: /get the untethered weekly/i })).toBeInTheDocument();
  });

  it("renders the final CTA section", () => {
    render(<LegacyHomePage />);
    expect(screen.getByText(/your next sales breakthrough/i)).toBeInTheDocument();
  });
});
