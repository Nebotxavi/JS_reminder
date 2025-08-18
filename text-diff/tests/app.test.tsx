import { render, screen, act, fireEvent } from "@testing-library/react";
import App from "../src/App";

describe("App", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders initial diff correctly", async () => {
    render(<App />);

    const originalOutput = screen.getByTestId("original-diff");
    const newOutput = screen.getByTestId("new-diff");

    expect(originalOutput).toHaveTextContent("This is just an example.");
    expect(newOutput).toHaveTextContent("This will be an example.");
  });

  it("updates diff after user edits input and delay passes", async () => {
    render(<App />);

    const newTextarea = screen.getByLabelText(/new/i);
    fireEvent.change(newTextarea, {
      target: { value: "This is completely different." },
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByTestId("new-diff")).toHaveTextContent(
      "This is completely different."
    );
  });

  it("does not update diff before debounce delay", () => {
    render(<App />);

    const newTextarea = screen.getByLabelText(/new/i);
    fireEvent.change(newTextarea, {
      target: { value: "Early update" },
    });

    // NOT advancing timers yet
    expect(screen.getByTestId("new-diff")).toHaveTextContent(
      "This will be an example."
    );
  });

  it("applies only final change after rapid typing", async () => {
    render(<App />);

    const newTextarea = screen.getByLabelText(/new/i);

    fireEvent.change(newTextarea, {
      target: { value: "Step 1" },
    });
    vi.advanceTimersByTime(50);

    fireEvent.change(newTextarea, {
      target: { value: "Step 2" },
    });
    vi.advanceTimersByTime(50);

    fireEvent.change(newTextarea, {
      target: { value: "Final change" },
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(screen.getByTestId("new-diff")).toHaveTextContent("Final change");
  });

  it("shows no diff when inputs are the same", async () => {
    render(<App />);

    const originalTextarea = screen.getByLabelText(/original/i);
    const newTextarea = screen.getByLabelText(/new/i);

    fireEvent.change(originalTextarea, {
      target: { value: "New text" },
    });
    fireEvent.change(newTextarea, {
      target: { value: "New text" }, // identical to original
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    const newDiff = screen.getByTestId("new-diff");
    const del = newDiff.querySelector("del");
    const ins = newDiff.querySelector("ins");

    expect(del).toBeNull();
    expect(ins).toBeNull();
  });
});
