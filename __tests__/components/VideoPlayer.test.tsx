import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VideoPlayer from "../../app/components/VideoPlayer";

// ---------------------------------------------------------------------------
// HTMLMediaElement mock (jsdom doesn't implement play/pause)
// ---------------------------------------------------------------------------
beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, "play", {
    configurable: true,
    writable: true,
    value: jest.fn().mockResolvedValue(undefined),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "pause", {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
  Object.defineProperty(HTMLMediaElement.prototype, "load", {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("VideoPlayer component", () => {
  // -----------------------------------------------------------------------
  // Initial render
  // -----------------------------------------------------------------------
  describe("initial render", () => {
    it("renders the video element with the provided source", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const source = document.querySelector("video source");
      expect(source).toHaveAttribute("src", "/test/video.mp4");
    });

    it("renders the Play video button initially", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      expect(screen.getByRole("button", { name: /play video/i })).toBeInTheDocument();
    });

    it("does not show the Pause button initially", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      expect(screen.queryByRole("button", { name: /pause video/i })).not.toBeInTheDocument();
    });

    it("renders the gradient overlay when not playing", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const overlay = document.querySelector("[aria-hidden='true'].absolute");
      expect(overlay).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Play / pause via button
  // -----------------------------------------------------------------------
  describe("play and pause controls", () => {
    it("calls video.play() when the play button is clicked", async () => {
      const user = userEvent.setup();
      render(<VideoPlayer source="/test/video.mp4" />);
      await user.click(screen.getByRole("button", { name: /play video/i }));
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it("shows the pause button after a play event fires on the video", async () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      act(() => { video.dispatchEvent(new Event("play")); });
      expect(await screen.findByRole("button", { name: /pause video/i })).toBeInTheDocument();
    });

    it("calls video.pause() when the pause button is clicked", async () => {
      const user = userEvent.setup();
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      act(() => { video.dispatchEvent(new Event("play")); });
      await user.click(await screen.findByRole("button", { name: /pause video/i }));
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });

    it("returns to play button after a pause event fires on the video", async () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      act(() => { video.dispatchEvent(new Event("play")); });
      act(() => { video.dispatchEvent(new Event("pause")); });
      expect(await screen.findByRole("button", { name: /play video/i })).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Click-on-video toggle
  // -----------------------------------------------------------------------
  describe("clicking directly on the video", () => {
    it("calls play() when the video is clicked while paused", async () => {
      const user = userEvent.setup();
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      await user.click(video);
      expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
    });

    it("calls pause() when the video is clicked while playing", async () => {
      const user = userEvent.setup();
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      // Simulate play state
      act(() => { video.dispatchEvent(new Event("play")); });
      await user.click(video);
      expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Video ended
  // -----------------------------------------------------------------------
  describe("video ended", () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    it("resets to play state when the video ends", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      act(() => { video.dispatchEvent(new Event("play")); });
      act(() => { video.dispatchEvent(new Event("ended")); });
      expect(screen.getByRole("button", { name: /play video/i })).toBeInTheDocument();
    });

    it("resets currentTime to 0 when the video ends", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      Object.defineProperty(video, "currentTime", { writable: true, value: 30 });
      act(() => { video.dispatchEvent(new Event("ended")); });
      expect(video.currentTime).toBe(0);
    });

    it("calls video.load() after 1000ms when the video ends", () => {
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;
      act(() => { video.dispatchEvent(new Event("ended")); });
      act(() => jest.advanceTimersByTime(1000));
      expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
    });
  });

  // -----------------------------------------------------------------------
  // Chaos scenarios
  // -----------------------------------------------------------------------
  describe("chaos scenarios", () => {
    it("re-renders correctly when the source prop changes", () => {
      const { rerender } = render(<VideoPlayer source="/video/one.mp4" />);
      expect(document.querySelector("video source")).toHaveAttribute("src", "/video/one.mp4");
      rerender(<VideoPlayer source="/video/two.mp4" />);
      expect(document.querySelector("video source")).toHaveAttribute("src", "/video/two.mp4");
    });

    it("renders with an empty source string without crashing", () => {
      expect(() => render(<VideoPlayer source="" />)).not.toThrow();
    });

    it("renders with a very long source URL without crashing", () => {
      expect(() => render(<VideoPlayer source={"/video/" + "x".repeat(2000) + ".mp4"} />)).not.toThrow();
    });

    it("handles rapid play-pause-play clicks without throwing", async () => {
      const user = userEvent.setup();
      render(<VideoPlayer source="/test/video.mp4" />);
      const video = document.querySelector("video")!;

      await user.click(screen.getByRole("button", { name: /play video/i }));
      act(() => { video.dispatchEvent(new Event("play")); });
      await user.click(screen.getByRole("button", { name: /pause video/i }));
      act(() => { video.dispatchEvent(new Event("pause")); });
      await user.click(screen.getByRole("button", { name: /play video/i }));

      expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
    });
  });
});
