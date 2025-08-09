import { renderHook, act } from "@testing-library/react";
import { useSpinDelay } from "../src/hooks/useSpinDelay";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useSpinDelay", () => {
  it("should initially return false", () => {
    const { result } = renderHook(() => useSpinDelay(false));
    expect(result.current).toBe(false);
  });

  it("should show spinner after delay when loading becomes true", () => {
    const { result } = renderHook(({ loading }) => useSpinDelay(loading, 200), {
      initialProps: { loading: true },
    });

    // False due to the 200ms delay
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(199);
    });

    // False due to the 200ms delay
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });

  it("should not show spinner if loading becomes false before delay finishes", () => {
    const { result, rerender } = renderHook(
      ({ loading }) => useSpinDelay(loading, 200),
      { initialProps: { loading: true } }
    );

    // False due to the 200ms delay
    expect(result.current).toBe(false);
    rerender({ loading: false });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // False due to the 200ms delay
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(100);
    });

    // False due to loading was set to false
    expect(result.current).toBe(false);
  });

  it("should hide after closeDelay when loading becomes false", () => {
    const delay = 200;
    const closeDelay = 200;

    const { result, rerender } = renderHook(
      ({ loading }) => useSpinDelay(loading, delay, closeDelay),
      { initialProps: { loading: true } }
    );

    // False due to the 200ms delay
    expect(result.current).toBe(false);

    act(() => {
      vi.advanceTimersByTime(delay);
    });

    // True after delay
    expect(result.current).toBe(true);

    rerender({ loading: false });

    act(() => {
      vi.advanceTimersByTime(1);
    });

    // Loading was set to false, but still true due to the close delay
    expect(result.current).toBe(true);

    act(() => {
      vi.advanceTimersByTime(closeDelay - 1);
    });

    // False after close delay
    expect(result.current).toBe(false);
  });
});
