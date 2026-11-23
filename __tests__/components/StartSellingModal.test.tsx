import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import StartSellingModal, {
  UNTETHERED_ACCESS_KEY,
} from "../../app/components/StartSellingModal";

// jest.setup.ts already mocks createPortal to render inline

describe("StartSellingModal component", () => {
  afterEach(() => {
    sessionStorage.clear();
  });

  it("renders the trigger button with the passed children and className", () => {
    render(<StartSellingModal className="my-class">Start Selling</StartSellingModal>);
    const trigger = screen.getByRole("button", { name: /start selling/i });
    expect(trigger).toHaveClass("my-class");
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
  });

  it("does not show the dialog initially", () => {
    render(<StartSellingModal>Open</StartSellingModal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the dialog when the trigger is clicked", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("moves focus to the close button after opening", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });
  });

  it("closes the dialog when the close button is clicked", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("returns focus to the trigger button after closing", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    const trigger = screen.getByRole("button", { name: /open/i });
    await user.click(trigger);
    await user.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(trigger).toHaveFocus();
    });
  });

  it("closes the dialog when clicking the overlay backdrop", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByRole("dialog"));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("does not close when clicking inside the modal content", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.click(screen.getByText(/sell more/i));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes the dialog when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("sets document.body.style.overflow to hidden while open and restores it on close", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(document.body.style.overflow).toBe("hidden");
    await user.click(screen.getByRole("button", { name: /close/i }));
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("unset");
    });
  });

  it("wraps focus from last to first focusable element on Tab", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    // Wait out the delayed auto-focus-on-open (setTimeout) before overriding
    // focus manually, otherwise it can steal focus back after this point.
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    const submitButton = screen.getByRole("button", { name: /start selling more/i });
    submitButton.focus();
    expect(submitButton).toHaveFocus();

    await user.tab();
    expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
  });

  it("wraps focus from first to last focusable element on Shift+Tab", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    await user.tab({ shift: true });
    expect(screen.getByRole("button", { name: /start selling more/i })).toHaveFocus();
  });

  it("moves focus normally when tabbing from a middle element (not the last)", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    const nameInput = screen.getByLabelText(/your name/i);
    nameInput.focus();
    expect(nameInput).toHaveFocus();

    await user.tab();
    expect(screen.getByLabelText(/your email address/i)).toHaveFocus();
  });

  it("moves focus normally when shift+tabbing from a middle element (not the first)", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    const emailInput = screen.getByLabelText(/your email address/i);
    emailInput.focus();
    expect(emailInput).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByLabelText(/your name/i)).toHaveFocus();
  });

  it("updates the name and email fields as the user types", async () => {
    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    // Wait out the delayed auto-focus-on-open (setTimeout) so it doesn't steal
    // focus mid-typing.
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    const nameInput = screen.getByLabelText(/your name/i);
    const emailInput = screen.getByLabelText(/your email address/i);

    await user.type(nameInput, "Jane Seller");
    await user.type(emailInput, "jane@example.com");

    expect(nameInput).toHaveValue("Jane Seller");
    expect(emailInput).toHaveValue("jane@example.com");
  });

  it("stores name/email in sessionStorage and navigates on submit", async () => {
    const push = jest.fn();
    jest.mocked(useRouter).mockReturnValue({
      push,
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
    } as unknown as ReturnType<typeof useRouter>);

    const user = userEvent.setup();
    render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /close/i })).toHaveFocus();
    });

    await user.type(screen.getByLabelText(/your name/i), "Jane Seller");
    await user.type(screen.getByLabelText(/your email address/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /start selling more/i }));

    expect(sessionStorage.getItem(UNTETHERED_ACCESS_KEY)).toBe(
      JSON.stringify({ name: "Jane Seller", email: "jane@example.com" })
    );
    expect(push).toHaveBeenCalledWith("/untethered-seller");
  });

  it("restores body overflow on unmount while open", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<StartSellingModal>Open</StartSellingModal>);
    await user.click(screen.getByRole("button", { name: /open/i }));
    expect(document.body.style.overflow).toBe("hidden");
    act(() => {
      unmount();
    });
    expect(document.body.style.overflow).toBe("unset");
  });
});
