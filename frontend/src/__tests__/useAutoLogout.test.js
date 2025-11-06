import { renderHook, act } from "@testing-library/react";
import useAutoLogout from "../hooks/useAutoLogout";

jest.useFakeTimers();

describe("useAutoLogout Hook", () => {
  let logout;

  beforeEach(() => {
    logout = jest.fn();
    jest.clearAllTimers();
  });

  test("should call logout after timeout", () => {
    renderHook(() => useAutoLogout(3000, logout));

    // fast-forward 3 seconds
    jest.advanceTimersByTime(3000);

    expect(logout).toHaveBeenCalledTimes(1);
  });

  test("should reset timer on user activity", () => {
    renderHook(() => useAutoLogout(3000, logout));

    // simulate activity (mousemove)
    act(() => {
      window.dispatchEvent(new Event("mousemove"));
    });

    // fast-forward 2.5s (not yet logged out)
    jest.advanceTimersByTime(2500);
    expect(logout).not.toHaveBeenCalled();

    // simulate activity again
    act(() => {
      window.dispatchEvent(new Event("keydown"));
    });

    // fast-forward another 3s (logout happens now)
    jest.advanceTimersByTime(3000);
    expect(logout).toHaveBeenCalledTimes(1);
  });

  test("should not run when timeout or logout missing", () => {
    renderHook(() => useAutoLogout(null, logout));

    jest.advanceTimersByTime(5000);

    expect(logout).not.toHaveBeenCalled();
  });
});