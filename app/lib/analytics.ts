declare global {
  interface Window {
    umami?: {
      track: (name: string, data?: Record<string, string>) => void;
    };
  }
}

export function trackEvent(name: string, data?: Record<string, string>): void {
  if (typeof window === "undefined" || !window.umami) return;
  window.umami.track(name, data);
}
