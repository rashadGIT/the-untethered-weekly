import "@testing-library/jest-dom";

// ---------------------------------------------------------------------------
// The setup file runs for both jsdom and node test environments.
// Guards ensure browser-only globals are only defined in the jsdom context.
// ---------------------------------------------------------------------------
const isJsdom = typeof window !== "undefined";

// Suppress jsdom's "Not implemented: navigation" console.error noise that
// appears when tests click real <a> elements.  Real errors are still reported.
const originalError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("Not implemented: navigation")) return;
  originalError(...args);
};

if (isJsdom) {
  // -------------------------------------------------------------------------
  // IntersectionObserver mock
  // -------------------------------------------------------------------------
  const mockIntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn((el: Element) => {
      // Store callback so individual tests can trigger it manually
      (el as any).__intersectionCallback = callback;
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(() => []),
  }));
  global.IntersectionObserver = mockIntersectionObserver as any;

  // -------------------------------------------------------------------------
  // window.matchMedia mock  (default: no reduced-motion preference)
  // -------------------------------------------------------------------------
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  // -------------------------------------------------------------------------
  // requestAnimationFrame mock
  //
  // The Counter component's animation loop calls window.requestAnimationFrame
  // recursively until `progress >= 1`.  A naive synchronous mock would
  // recurse infinitely because `timestamp` never advances relative to the
  // captured `startTime`.
  //
  // Strategy: advance the timestamp by 9999 ms on every call so that
  // `progress = (timestamp - startTime) / duration` is always >= 1,
  // causing the loop to stop after one iteration.
  // -------------------------------------------------------------------------
  let rafTimestamp = 0;
  global.requestAnimationFrame = jest.fn((cb) => {
    rafTimestamp += 9999;
    // Run the callback asynchronously so React state updates can flush
    setTimeout(() => cb(rafTimestamp), 0);
    return rafTimestamp;
  }) as any;

  // -------------------------------------------------------------------------
  // createPortal – render children inline so React Testing Library finds them
  // -------------------------------------------------------------------------
  jest.mock("react-dom", () => {
    const actual = jest.requireActual("react-dom");
    return {
      ...actual,
      createPortal: (node: React.ReactNode) => node,
    };
  });
}
