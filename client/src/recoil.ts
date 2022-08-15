import { atom, selector } from "recoil";
import { milliseconds2timerText } from "./utils";

export const startTimeMsState = atom({
  key: "startTimeMsState",
  default: 0,
});

export const durationMsState = atom({
  key: "durationMsState",
  default: 10 * 1000,
});

export const currentTimeMsState = atom({
  key: "currentTimeMsState",
  default: 0,
});

export const remainingMsState = selector({
  key: "remainingMsState",
  get: ({ get }) => {
    const startTimeMs = get(startTimeMsState);
    if (startTimeMs === 0) {
      return undefined;
    }
    const durationMs = get(durationMsState);
    if (durationMs === 0) {
      return undefined;
    }
    const currentTimeMs = get(currentTimeMsState);
    if (currentTimeMs === 0) {
      return undefined;
    }
    if (currentTimeMs < startTimeMs) {
      return undefined;
    }
    const remainingMs = durationMs - (currentTimeMs - startTimeMs);
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
    if (remainingMs !== undefined && remainingMs <= 0) {
      return false;
    }
    return true;
  },
});

export const timerFinishedState = selector({
  key: "timerFinishedState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs === undefined) {
      return false;
    }
    return remainingMs <= 0;
  },
});

export const timerTextState = selector({
  key: "timerTextState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs === undefined) {
      const durationMs = get(durationMsState);
      return milliseconds2timerText(durationMs);
    }
    if (remainingMs > 0) {
      return milliseconds2timerText(remainingMs);
    }
    return milliseconds2timerText(0);
  },
});
