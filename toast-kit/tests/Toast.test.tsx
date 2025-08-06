import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Toast } from "../src/component/Toast";

describe("Toast", () => {
  it("renders a toast message", () => {
    render(
      <Toast
        message="Hello message"
        onClose={() => {}}
        id={""}
        title={"Hello title"}
        type={"success"}
        position={"bottom-left"}
      />
    );

    const alert = screen.getByRole("alert");

    expect(alert).toHaveClass("tk-toast--success");
    expect(alert).toHaveClass("tk-toast--bottom-left");

    const icon = alert.querySelector(".tk-toast__icon svg");
    expect(icon).toHaveClass("tk-toast__icon--success");

    expect(screen.getByText("Hello message")).toBeInTheDocument();
    expect(screen.getByText("Hello title")).toBeInTheDocument();
  });

  it("renders a toast message without title", () => {
    render(
      <Toast
        message=""
        onClose={() => {}}
        id={""}
        title={""}
        type={"success"}
        position={"bottom-left"}
      />
    );

    const alert = screen.getByRole("alert");

    expect(alert).toHaveClass("tk-toast--success");
    expect(alert).toHaveClass("tk-toast--bottom-left");

    const icon = alert.querySelector(".tk-toast__icon svg");
    expect(icon).toHaveClass("tk-toast__icon--success");
  });

  it("calls onClose after duration", () => {
    vi.useFakeTimers();
    const onClose = vi.fn();

    render(
      <Toast
        id=""
        title="Auto close"
        message="Test"
        type="info"
        position="bottom-right"
        duration={3000}
        onClose={onClose}
      />
    );

    vi.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalled();

    vi.useRealTimers();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn();

    render(
      <Toast
        id=""
        title="Close button"
        message="Click to close"
        type="warning"
        position="bottom-right"
        onClose={onClose}
      />
    );

    const button = screen.getByRole("button");
    button.click();

    expect(onClose).toHaveBeenCalled();
  });
});
