import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewsletterForm from "../../app/components/NewsletterForm";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function mockFetchSuccess(message?: string) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true, message: message ?? null }),
  } as Response);
}

function mockFetchError(errorMsg: string, status = 400) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    json: async () => ({ error: errorMsg }),
  } as Response);
}

function mockFetchNetworkFailure() {
  global.fetch = jest.fn().mockRejectedValue(new Error("Network Error"));
}

async function fillAndSubmit(
  user: ReturnType<typeof userEvent.setup>,
  { email = "test@example.com", firstName = "" }: { email?: string; firstName?: string } = {}
) {
  if (email) await user.type(screen.getByLabelText(/email address/i), email);
  if (firstName) await user.type(screen.getByLabelText(/first name/i), firstName);
  await user.click(screen.getByRole("button", { name: /subscribe/i }));
}

describe("NewsletterForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // Initial render
  // -----------------------------------------------------------------------
  describe("initial render", () => {
    it("renders the email input", () => {
      render(<NewsletterForm />);
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it("renders the first name input", () => {
      render(<NewsletterForm />);
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    });

    it("renders the subscribe button", () => {
      render(<NewsletterForm />);
      expect(
        screen.getByRole("button", { name: /subscribe to the untethered weekly/i })
      ).toBeInTheDocument();
    });

    it("shows 'Get Weekly Courage' button label by default", () => {
      render(<NewsletterForm />);
      expect(screen.getByText(/get weekly courage/i)).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------------
  describe("loading state", () => {
    it("shows 'Subscribing...' while the request is in-flight", async () => {
      // Delay resolution to observe intermediate loading state
      global.fetch = jest.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true, message: null }),
        }), 200))
      );

      const user = userEvent.setup();
      render(<NewsletterForm />);
      await user.type(screen.getByLabelText(/email address/i), "test@example.com");
      await user.click(screen.getByRole("button", { name: /subscribe/i }));

      expect(await screen.findByText(/subscribing/i)).toBeInTheDocument();
    });

    it("disables the email input during loading", async () => {
      global.fetch = jest.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true }),
        }), 200))
      );

      const user = userEvent.setup();
      render(<NewsletterForm />);
      await user.type(screen.getByLabelText(/email address/i), "test@example.com");
      await user.click(screen.getByRole("button", { name: /subscribe/i }));

      expect(screen.getByLabelText(/email address/i)).toBeDisabled();
    });
  });

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------
  describe("success state", () => {
    it("shows a success message after a successful submission", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() =>
        expect(screen.getByText(/you're in/i)).toBeInTheDocument()
      );
    });

    it("shows a custom success message returned from the API", async () => {
      mockFetchSuccess("Welcome to the tribe!");
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() =>
        expect(screen.getByText(/welcome to the tribe/i)).toBeInTheDocument()
      );
    });

    it("hides the form after successful submission", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() =>
        expect(screen.queryByRole("button", { name: /subscribe/i })).not.toBeInTheDocument()
      );
    });
  });

  // -----------------------------------------------------------------------
  // Error state
  // -----------------------------------------------------------------------
  describe("error state", () => {
    it("shows an error alert when the API returns an error response", async () => {
      mockFetchError("Email already subscribed.");
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() =>
        expect(screen.getByRole("alert")).toBeInTheDocument()
      );
      expect(screen.getByRole("alert")).toHaveTextContent(/email already subscribed/i);
    });

    it("shows an error when the network request fails", async () => {
      mockFetchNetworkFailure();
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() =>
        expect(screen.getByRole("alert")).toBeInTheDocument()
      );
      expect(screen.getByRole("alert")).toHaveTextContent(/network error/i);
    });

    it("keeps the form visible after an error so the user can retry", async () => {
      mockFetchError("Something went wrong.");
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user);
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Payload correctness
  // -----------------------------------------------------------------------
  describe("POST payload", () => {
    it("POSTs the correct payload to /api/newsletter", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await user.type(screen.getByLabelText(/email address/i), "shannon@example.com");
      await user.type(screen.getByLabelText(/first name/i), "Shannon");
      await user.click(screen.getByRole("button", { name: /subscribe/i }));

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe("/api/newsletter");
      expect(options.method).toBe("POST");

      const body = JSON.parse(options.body);
      expect(body).toEqual({ email: "shannon@example.com", firstName: "Shannon" });
    });

    it("POSTs with empty firstName when name field is left blank", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<NewsletterForm />);
      await fillAndSubmit(user, { firstName: "" });

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body.firstName).toBe("");
    });
  });
});
