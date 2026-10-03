import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import UntetheredSellerPage from "../app/untethered-seller/page";
import { UNTETHERED_ACCESS_KEY } from "../app/components/StartSellingModal";

describe("UntetheredSellerPage audio player", () => {
  let playSpy: jest.SpyInstance;
  let pauseSpy: jest.SpyInstance;

  beforeEach(() => {
    sessionStorage.setItem(UNTETHERED_ACCESS_KEY, "true");
    playSpy = jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    pauseSpy = jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });

  afterEach(() => {
    sessionStorage.clear();
    jest.restoreAllMocks();
  });

  function getAudio() {
    return document.querySelector("audio") as HTMLAudioElement;
  }

  it("redirects home when the visitor has no access", () => {
    sessionStorage.clear();
    const replace = jest.fn();
    jest.mocked(useRouter).mockReturnValueOnce({ push: jest.fn(), replace, back: jest.fn(), prefetch: jest.fn() } as never);
    render(<UntetheredSellerPage />);
    expect(replace).toHaveBeenCalledWith("/");
  });

  it("plays the Day 4 audio file when its play button is clicked", async () => {
    const user = userEvent.setup();
    render(<UntetheredSellerPage />);

    await user.click(await screen.findByRole("button", { name: "Play Day 4 audio" }));

    expect(getAudio().src).toMatch(/\/assets\/audio\/untethered-seller\/day-4\.m4a$/);
    expect(playSpy).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Pause Day 4 audio" })).toBeInTheDocument();
  });

  it("pauses when the playing day is clicked again", async () => {
    const user = userEvent.setup();
    render(<UntetheredSellerPage />);

    await user.click(await screen.findByRole("button", { name: "Play Day 4 audio" }));
    await user.click(screen.getByRole("button", { name: "Pause Day 4 audio" }));

    expect(pauseSpy).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Play Day 4 audio" })).toBeInTheDocument();
  });

  it("resets the button when playback fails", async () => {
    playSpy.mockRejectedValue(new Error("NotSupportedError"));
    const user = userEvent.setup();
    render(<UntetheredSellerPage />);

    await user.click(await screen.findByRole("button", { name: "Play Day 1 audio" }));

    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Play Day 1 audio" })).toBeInTheDocument()
    );
  });
});
