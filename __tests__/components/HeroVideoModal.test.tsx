import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeroVideoModal from "../../app/components/HeroVideoModal";

// jest.setup.ts already mocks createPortal to render inline

describe("HeroVideoModal component", () => {
  // -----------------------------------------------------------------------
  // Trigger button
  // -----------------------------------------------------------------------
  describe("trigger button", () => {
    it("renders the 'Watch The Video' trigger button", () => {
      render(<HeroVideoModal />);
      expect(
        screen.getByRole("button", { name: /watch the video/i })
      ).toBeInTheDocument();
    });

    it("sets aria-haspopup='dialog' on the trigger button", () => {
      render(<HeroVideoModal />);
      expect(
        screen.getByRole("button", { name: /watch the video/i })
      ).toHaveAttribute("aria-haspopup", "dialog");
    });
  });

  // -----------------------------------------------------------------------
  // Modal open/close
  // -----------------------------------------------------------------------
  describe("modal open/close behaviour", () => {
    it("does not show the modal dialog initially", () => {
      render(<HeroVideoModal />);
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens the modal when the trigger button is clicked", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() =>
        expect(screen.getByRole("dialog")).toBeInTheDocument()
      );
    });

    it("closes the modal when the close button is clicked", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      await user.click(screen.getByRole("button", { name: /close video/i }));
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });

    it("closes the modal when the Escape key is pressed", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      await user.keyboard("{Escape}");
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });

    it("closes the modal when the backdrop (aria-hidden div) is clicked", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

      // The backdrop is aria-hidden="true" — find by attribute selector
      const backdrop = document.querySelector('[aria-hidden="true"].absolute.inset-0') as HTMLElement;
      expect(backdrop).not.toBeNull();
      await user.click(backdrop);
      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
      );
    });
  });

  // -----------------------------------------------------------------------
  // Focus management
  // -----------------------------------------------------------------------
  describe("focus management", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });
    afterEach(() => {
      jest.useRealTimers();
    });

    it("moves focus to the close button when the modal opens", async () => {
      const user = userEvent.setup({ delay: null });
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      act(() => jest.runAllTimers());
      await waitFor(() => {
        const closeBtn = screen.queryByRole("button", { name: /close video/i });
        if (closeBtn) {
          expect(document.activeElement).toBe(closeBtn);
        }
      });
    });
  });

  // -----------------------------------------------------------------------
  // Video source
  // -----------------------------------------------------------------------
  describe("video source prop", () => {
    it("renders the default video src in the modal", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      const video = document.querySelector("video");
      expect(video).toHaveAttribute(
        "src",
        "/assets/videos/home/hero-background-0.mp4"
      );
    });

    it("renders a custom videoSrc when provided", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal videoSrc="/custom/video.mp4" />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      const video = document.querySelector("video");
      expect(video).toHaveAttribute("src", "/custom/video.mp4");
    });
  });

  // -----------------------------------------------------------------------
  // Accessibility attributes
  // -----------------------------------------------------------------------
  describe("accessibility", () => {
    it("dialog has aria-modal='true'", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
    });

    it("dialog has an accessible label", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      expect(screen.getByRole("dialog", { name: /video player/i })).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Focus trap (Tab key)
  // -----------------------------------------------------------------------
  describe("focus trap", () => {
    it("does not close the modal when Tab is pressed", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      await user.keyboard("{Tab}");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("does not close the modal when Shift+Tab is pressed", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      await user.keyboard("{Shift>}{Tab}{/Shift}");
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Video container click does not close modal (stopPropagation)
  // -----------------------------------------------------------------------
  describe("video container click", () => {
    it("does not close the modal when clicking the video container", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

      // Click the video container (the div wrapping the video element)
      const video = document.querySelector("video")!;
      const container = video.parentElement!;
      await user.click(container);

      // Modal should still be open (stopPropagation prevents backdrop close)
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------
  describe("body scroll lock", () => {
    it("sets body overflow to hidden when modal opens", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("restores body overflow when modal closes", async () => {
      const user = userEvent.setup();
      render(<HeroVideoModal />);
      await user.click(screen.getByRole("button", { name: /watch the video/i }));
      await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());
      await user.click(screen.getByRole("button", { name: /close video/i }));
      await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
      expect(document.body.style.overflow).toBe("unset");
    });
  });
});
