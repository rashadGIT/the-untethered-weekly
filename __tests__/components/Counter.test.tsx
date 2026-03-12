import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import Counter from "../../app/components/Counter";

// Helper: configure window.matchMedia for reduced-motion preference
function setReducedMotion(prefersReduced: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: prefersReduced && query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
}

interface ObservableElement extends Element {
  __intersectionCallback?: IntersectionObserverCallback;
}

// Helper: trigger IntersectionObserver callback for an element
function triggerIntersection(element: ObservableElement, isIntersecting: boolean) {
  const cb = element.__intersectionCallback;
  if (cb) {
    act(() => {
      cb([{ isIntersecting, target: element } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
  }
}

describe("Counter component", () => {
  afterEach(() => {
    setReducedMotion(false);
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // prefers-reduced-motion = true
  // -----------------------------------------------------------------------
  describe("when prefers-reduced-motion is enabled", () => {
    beforeEach(() => setReducedMotion(true));

    it("renders the final value immediately without animation", () => {
      render(<Counter value={300} />);
      expect(screen.getByText("300")).toBeInTheDocument();
    });

    it("renders the final value with suffix immediately", () => {
      render(<Counter value={10} suffix="+" />);
      expect(screen.getByText("10+")).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Normal motion
  // -----------------------------------------------------------------------
  describe("when motion is allowed", () => {
    beforeEach(() => setReducedMotion(false));

    it("starts at 0 before intersection", () => {
      render(<Counter value={500} />);
      // Before intersection the count is 0
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("animates to the target value after element enters viewport", async () => {
      render(<Counter value={150} />);
      const span = document.querySelector("span")!;
      triggerIntersection(span, true);
      // The rAF mock is async (setTimeout 0) so we wait for the DOM to update
      await waitFor(() => expect(screen.getByText("150")).toBeInTheDocument(), {
        timeout: 3000,
      });
    });

    it("renders the suffix alongside the animated count", async () => {
      render(<Counter value={10} suffix="+" />);
      const span = document.querySelector("span")!;
      triggerIntersection(span, true);
      await waitFor(() => expect(screen.getByText("10+")).toBeInTheDocument(), {
        timeout: 3000,
      });
    });

    it("does not restart animation when non-intersecting callback fires", () => {
      render(<Counter value={99} />);
      const span = document.querySelector("span")!;
      triggerIntersection(span, false);
      // Animation was not triggered, so count stays at 0
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("renders a <span> element", () => {
      render(<Counter value={42} />);
      expect(document.querySelector("span")).toBeInTheDocument();
    });
  });
});
