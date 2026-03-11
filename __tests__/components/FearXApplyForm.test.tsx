import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FearXApplyForm from "../../app/fearx/FearXApplyForm";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function mockFetchSuccess() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
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
  global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
}

const VALID_SPEAKER = {
  firstName: "Jane",
  email: "jane@example.com",
  role: "Sales Director",
  story: "I faced fear every day for years and finally chose courage over comfort in a high-stakes deal.",
};

async function fillSpeakerForm(user: ReturnType<typeof userEvent.setup>, overrides: Partial<typeof VALID_SPEAKER> = {}) {
  const values = { ...VALID_SPEAKER, ...overrides };

  if (values.firstName) {
    await user.type(screen.getByPlaceholderText(/first name/i), values.firstName);
  }
  if (values.email) {
    await user.type(screen.getByPlaceholderText(/email address/i), values.email);
  }
  if (values.role) {
    await user.type(screen.getByPlaceholderText(/role \/ title/i), values.role);
  }
  if (values.story) {
    await user.type(screen.getByRole("textbox", { name: /courage story/i }), values.story);
  }
}

describe("FearXApplyForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -----------------------------------------------------------------------
  // Label differentiation
  // -----------------------------------------------------------------------
  describe("form label based on type prop", () => {
    it("renders 'speaker' label context when type='speaker'", () => {
      render(<FearXApplyForm type="speaker" />);
      const submitBtn = screen.getByRole("button", { name: /apply to become a fearx speaker/i });
      expect(submitBtn).toBeInTheDocument();
    });

    it("renders 'panelist' label context when type='panelist'", () => {
      render(<FearXApplyForm type="panelist" />);
      const submitBtn = screen.getByRole("button", { name: /apply to become a fearx panelist/i });
      expect(submitBtn).toBeInTheDocument();
    });

    it("uses speaker-specific input ids when type='speaker'", () => {
      render(<FearXApplyForm type="speaker" />);
      expect(document.getElementById("speaker-firstName")).toBeInTheDocument();
      expect(document.getElementById("speaker-email")).toBeInTheDocument();
    });

    it("uses panelist-specific input ids when type='panelist'", () => {
      render(<FearXApplyForm type="panelist" />);
      expect(document.getElementById("panelist-firstName")).toBeInTheDocument();
      expect(document.getElementById("panelist-email")).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Form fields present
  // -----------------------------------------------------------------------
  describe("form fields", () => {
    it("renders first name, email, role, years-in-sales, and story fields", () => {
      render(<FearXApplyForm type="speaker" />);
      expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/role \/ title/i)).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: /years in sales/i })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /courage story/i })).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Loading state
  // -----------------------------------------------------------------------
  describe("loading state", () => {
    it("shows 'Submitting...' while request is in-flight", async () => {
      global.fetch = jest.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true }),
        }), 200))
      );

      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));

      expect(await screen.findByText(/submitting/i)).toBeInTheDocument();
    });

    it("disables the submit button during loading", async () => {
      global.fetch = jest.fn().mockImplementation(
        () => new Promise((resolve) => setTimeout(() => resolve({
          ok: true,
          json: async () => ({ success: true }),
        }), 200))
      );

      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));

      const btn = screen.getByRole("button", { name: /apply/i });
      expect(btn).toBeDisabled();
    });
  });

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------
  describe("success state", () => {
    it("shows 'Application Received' on success", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() =>
        expect(screen.getByText(/application received/i)).toBeInTheDocument()
      );
    });

    it("displays the applicant's first name in the success message", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() =>
        expect(screen.getByText(/jane/i)).toBeInTheDocument()
      );
    });

    it("shows the correct application type label in the success message for panelist", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<FearXApplyForm type="panelist" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() =>
        expect(screen.getByText(/fearx panelist application/i)).toBeInTheDocument()
      );
    });
  });

  // -----------------------------------------------------------------------
  // Error state
  // -----------------------------------------------------------------------
  describe("error state", () => {
    it("shows an error alert when the API returns an error", async () => {
      mockFetchError("Name, email, and story are required.");
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByRole("alert")).toHaveTextContent(/name, email, and story are required/i);
    });

    it("shows an error when the network request fails", async () => {
      mockFetchNetworkFailure();
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    });

    it("keeps the form visible after an error", async () => {
      mockFetchError("Something went wrong.");
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));
      await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
      expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
    });
  });

  // -----------------------------------------------------------------------
  // Payload correctness
  // -----------------------------------------------------------------------
  describe("POST payload", () => {
    it("POSTs the correct payload for a speaker application", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<FearXApplyForm type="speaker" />);

      await user.type(screen.getByPlaceholderText(/first name/i), "Jane");
      await user.type(screen.getByPlaceholderText(/email address/i), "jane@example.com");
      await user.type(screen.getByPlaceholderText(/role \/ title/i), "Sales Director");
      await user.selectOptions(screen.getByRole("combobox"), "5-10");
      await user.type(
        screen.getByRole("textbox", { name: /courage story/i }),
        "A long courage story about choosing courage over comfort in a high stakes moment."
      );
      await user.click(screen.getByRole("button", { name: /apply/i }));

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

      const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe("/api/fearx-apply");
      expect(options.method).toBe("POST");

      const body = JSON.parse(options.body);
      expect(body.type).toBe("speaker");
      expect(body.firstName).toBe("Jane");
      expect(body.email).toBe("jane@example.com");
      expect(body.role).toBe("Sales Director");
      expect(body.yearsInSales).toBe("5-10");
      expect(typeof body.story).toBe("string");
      expect(body.story.length).toBeGreaterThan(0);
    });

    it("includes type='panelist' in payload for panelist form", async () => {
      mockFetchSuccess();
      const user = userEvent.setup();
      render(<FearXApplyForm type="panelist" />);
      await fillSpeakerForm(user);
      await user.click(screen.getByRole("button", { name: /apply/i }));

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      const body = JSON.parse((global.fetch as jest.Mock).mock.calls[0][1].body);
      expect(body.type).toBe("panelist");
    });
  });
});
