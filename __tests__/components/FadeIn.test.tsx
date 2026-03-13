import React from "react";
import { render, screen, act } from "@testing-library/react";
import FadeIn from "../../app/components/FadeIn";

// Helper: configure window.matchMedia to return a specific reduced-motion preference
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

// Helper: trigger the IntersectionObserver callback for a given element
function triggerIntersection(element: ObservableElement, isIntersecting: boolean) {
  const cb = element.__intersectionCallback;
  if (cb) {
    act(() => {
      cb([{ isIntersecting, target: element } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
  }
}

describe("FadeIn component", () => {
  afterEach(() => {
    // Reset matchMedia to no reduced-motion preference after each test
    setReducedMotion(false);
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // prefers-reduced-motion = true
  // -----------------------------------------------------------------------
  describe("when prefers-reduced-motion is enabled", () => {
    beforeEach(() => setReducedMotion(true));

    it("renders children immediately visible (opacity 1)", () => {
      render(
        <FadeIn>
          <p>Visible content</p>
        </FadeIn>
      );
      const wrapper = screen.getByText("Visible content").parentElement!;
      expect(wrapper).toHaveStyle("opacity: 1");
    });

    it("sets transition to 'none'", () => {
      render(
        <FadeIn>
          <span>No animation</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("No animation").parentElement!;
      expect(wrapper).toHaveStyle("transition: none");
    });

    it("applies no transform offset when already visible", () => {
      render(
        <FadeIn direction="up">
          <span>No offset</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("No offset").parentElement!;
      expect(wrapper).toHaveStyle("transform: none");
    });
  });

  // -----------------------------------------------------------------------
  // Normal motion
  // -----------------------------------------------------------------------
  describe("when motion is allowed", () => {
    beforeEach(() => setReducedMotion(false));

    it("starts hidden (opacity 0) before intersection", () => {
      render(
        <FadeIn>
          <p>Hidden initially</p>
        </FadeIn>
      );
      const wrapper = screen.getByText("Hidden initially").parentElement!;
      expect(wrapper).toHaveStyle("opacity: 0");
    });

    it("becomes visible (opacity 1) after intersection", () => {
      render(
        <FadeIn>
          <p>Reveals on scroll</p>
        </FadeIn>
      );
      const wrapper = screen.getByText("Reveals on scroll").parentElement!;
      triggerIntersection(wrapper, true);
      expect(wrapper).toHaveStyle("opacity: 1");
    });

    it("applies upward transform offset before intersection", () => {
      render(
        <FadeIn direction="up">
          <span>Slide up</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("Slide up").parentElement!;
      expect(wrapper).toHaveStyle("transform: translateY(20px)");
    });

    it("applies downward transform offset before intersection", () => {
      render(
        <FadeIn direction="down">
          <span>Slide down</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("Slide down").parentElement!;
      expect(wrapper).toHaveStyle("transform: translateY(-20px)");
    });

    it("applies left transform offset before intersection", () => {
      render(
        <FadeIn direction="left">
          <span>Slide left</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("Slide left").parentElement!;
      expect(wrapper).toHaveStyle("transform: translateX(20px)");
    });

    it("applies right transform offset before intersection", () => {
      render(
        <FadeIn direction="right">
          <span>Slide right</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("Slide right").parentElement!;
      expect(wrapper).toHaveStyle("transform: translateX(-20px)");
    });

    it("clears transform to 'none' after intersection", () => {
      render(
        <FadeIn direction="up">
          <span>After intersect</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("After intersect").parentElement!;
      triggerIntersection(wrapper, true);
      expect(wrapper).toHaveStyle("transform: none");
    });

    it("applies the custom className to the wrapper div", () => {
      render(
        <FadeIn className="custom-fade">
          <span>Classed</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("Classed").parentElement!;
      expect(wrapper).toHaveClass("custom-fade");
    });

    it("does not reveal on non-intersecting callback", () => {
      render(
        <FadeIn>
          <p>Still hidden</p>
        </FadeIn>
      );
      const wrapper = screen.getByText("Still hidden").parentElement!;
      triggerIntersection(wrapper, false);
      expect(wrapper).toHaveStyle("opacity: 0");
    });

    it("applies 'none' transform when direction is 'none' before intersection", () => {
      render(
        <FadeIn direction="none">
          <span>No direction</span>
        </FadeIn>
      );
      const wrapper = screen.getByText("No direction").parentElement!;
      // direction="none" hits the default switch case — transform is "none"
      expect(wrapper).toHaveStyle("transform: none");
    });

    it("includes custom duration in the transition style", () => {
      render(<FadeIn duration={1.5}><span>dur</span></FadeIn>);
      const wrapper = screen.getByText("dur").parentElement!;
      expect(wrapper.style.transition).toContain("1.5s");
    });

    it("includes custom delay in the transition style", () => {
      render(<FadeIn delay={0.5}><span>del</span></FadeIn>);
      const wrapper = screen.getByText("del").parentElement!;
      expect(wrapper.style.transition).toContain("0.5s");
    });
  });
});
