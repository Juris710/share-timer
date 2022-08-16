import { atom, selector } from "recoil";

export const errorMessageState = atom({
  key: "errorMessageState",
  default: "",
});

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
  default: 0,
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
    if (durationMs === undefined) {
      return undefined;
    }
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

export const timerStateState = selector({
  key: "timerStateState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs === undefined) {
      return "loading";
    }
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
