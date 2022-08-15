/* eslint-disable @typescript-eslint/no-empty-interface */
type ErrorCodes = "invalid-timer-id" | "invalid-token";
interface ServerToClientEvents {
  timerJoined: (
    timerId: string,
    durationMs: number,
    startTimeMs: number,
    elapsedMs: number
  ) => void;

  timerStarted: (
    timerId: string,
    startTimeMs: number,
    elapsedMs: number
  ) => void;
  timerPaused: (timerId: string, elapsedMs: number) => void;
  timerResetted: (timerId: string) => void;

  requestFailed: (message: ErrorCodes) => void;
}

interface ClientToServerEvents {
  createTimer: (
    durationMs: number,
    callback: (timerId: string, token: string) => void
  ) => void;
  startTimer: (timerId: string, token: string) => void;
  pauseTimer: (timerId: string, token: string) => void;
  resetTimer: (timerId: string, token: string) => void;

  joinTimer: (timerId: string) => void;
}

interface InterServerEvents {}

interface SocketData {}
