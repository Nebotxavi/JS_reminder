import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ToastManager, showToast } from "../src/ToastManager";

describe("ToastManager", () => {
  it("renders toast via showToast", () => {
    render(<ToastManager />);

    act(() => {
      showToast({
        type: "info",
        title: "Test Title",
        message: "Test Message",
        position: "bottom-right",
      });
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("renders multiple toasts", () => {
    render(<ToastManager />);

    act(() => {
      showToast({
        type: "info",
        title: "First",
        message: "First toast",
        position: "bottom-right",
      });
      showToast({
        type: "success",
        title: "Second",
        message: "Second toast",
        position: "bottom-right",
      });
    });

    expect(screen.getByText("First toast")).toBeInTheDocument();
    expect(screen.getByText("Second toast")).toBeInTheDocument();
  });

  it("removes toast after duration", () => {
    vi.useFakeTimers();
    render(<ToastManager />);

    act(() => {
      showToast({
        type: "success",
        title: "Auto-dismiss",
        message: "Will disappear",
        position: "bottom-right",
        duration: 3000,
      });
    });

    expect(screen.getByText("Will disappear")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText("Will disappear")).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it("removes toast when close button is clicked", async () => {
    render(<ToastManager />);

    act(() => {
      showToast({
        type: "error",
        title: "Closable",
        message: "Click close",
        position: "bottom-right",
      });
    });

    const closeButton = screen.getByRole("button");
    expect(screen.getByText("Click close")).toBeInTheDocument();

    act(() => {
      closeButton.click();
    });

    // Wait for the toast to be removed asynchronously
    await waitFor(() => {
      expect(screen.queryByText("Click close")).not.toBeInTheDocument();
    });
  });
});
