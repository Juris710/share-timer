import { atom, selector } from "recoil";
import { milliseconds2timerText } from "./utils";

export const timerIdState = atom<string | undefined>({
  key: "timerIdState",
  default: undefined,
});

export const startTimeMsState = atom({
  key: "startTimeMsState",
  default: 0,
});

export const durationMsState = atom({
  key: "durationMsState",
  default: 10 * 1000,
});

export const elapsedMsState = atom({
  key: "elapsedMsState",
  default: 0,
});

export const currentTimeMsState = atom({
  key: "currentTimeMsState",
  default: 0,
});

export const remainingMsState = selector({
  key: "remainingMsState",
  get: ({ get }) => {
    const durationMs = get(durationMsState);
    const elapsedMs = get(elapsedMsState);
    const startTimeMs = get(startTimeMsState);
    const currentTimeMs = get(currentTimeMsState);
    let remainingMs = durationMs - elapsedMs;
    if (currentTimeMs > startTimeMs) {
      remainingMs -= currentTimeMs - startTimeMs;
    }
    return remainingMs;
  },
});

export const shouldRunTimerState = selector({
  key: "shouldRunTimerState",
  get: ({ get }) => {
    const durationMs = get(durationMsState);
    if (durationMs === 0) {
      return false;
    }
    const startTimeMs = get(startTimeMsState);
    if (startTimeMs === 0) {
      return false;
    }
    const remainingMs = get(remainingMsState);
    if (remainingMs <= 0) {
      return false;
    }
    return true;
  },
});

export const timerStateState = selector({
  key: "timerStateState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs <= 0) {
      return "finished";
    }
    const startTimeMs = get(startTimeMsState);
    const currentTimeMs = get(currentTimeMsState);
    if (startTimeMs > 0 || currentTimeMs > 0) {
      return "running";
    }
    const elapsedMs = get(elapsedMsState);
    if (elapsedMs > 0) {
      return "paused";
    }
    return "idle";
  },
});

export const timerTextState = selector({
  key: "timerTextState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs > 0) {
      return milliseconds2timerText(remainingMs);
    }
    return milliseconds2timerText(0);
  },
});
