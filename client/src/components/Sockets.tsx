import React, { useEffect, useRef } from "react";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { io, Socket } from "socket.io-client";
import {
  currentTimeMsState,
  durationMsState,
  elapsedMsState,
  errorMessageState,
  startTimeMsState,
  timerIdState,
} from "../recoil";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  import.meta.env.DEV ? io("http://localhost:3000") : io();
export const errorMessages: Record<ErrorCode, string> = {
  "invalid-timer-id": "指定されたタイマーは存在しません。",
  "invalid-token": "あなたにはこのタイマーを操作する権限がありません。",
  "unexpected-error": "想定外のエラーです。",
};

export const Sockets: React.FC = () => {
  const initialized = useRef(false);
  const setDurationMs = useSetRecoilState(durationMsState);
  const setStartTimeMs = useSetRecoilState(startTimeMsState);
  const setCurrentTimeMs = useSetRecoilState(currentTimeMsState);
  const setElapsedMs = useSetRecoilState(elapsedMsState);
  const setErrorCode = useSetRecoilState(errorMessageState);

  const timerJoined = useRecoilCallback(
    ({ snapshot }) =>
      async (
        timerId: string,
        durationMs: number,
        startTimeMs: number,
        elapsedMs: number
      ) => {
        const currentTimerId = await snapshot.getPromise(timerIdState);
        if (currentTimerId !== timerId) {
          return;
        }

        setDurationMs(durationMs);
        setElapsedMs(elapsedMs);
        setStartTimeMs(startTimeMs);
      }
  );
  const timerStarted = useRecoilCallback(
    ({ snapshot }) =>
      async (timerId: string, startTimeMs: number, elapsedMs: number) => {
        const currentTimerId = await snapshot.getPromise(timerIdState);
        if (currentTimerId !== timerId) {
          return;
        }

        setElapsedMs(elapsedMs);
        setStartTimeMs(startTimeMs);
      }
  );
  const timerPaused = useRecoilCallback(
    ({ snapshot }) =>
      async (timerId: string, elapsedMs: number) => {
        const currentTimerId = await snapshot.getPromise(timerIdState);
        if (currentTimerId !== timerId) {
          return;
        }
        setStartTimeMs(0);
        setCurrentTimeMs(0);
        setElapsedMs(elapsedMs);
      }
  );
  const timerResetted = useRecoilCallback(
    ({ snapshot }) =>
      async (timerId: string) => {
        const currentTimerId = await snapshot.getPromise(timerIdState);
        if (currentTimerId !== timerId) {
          return;
        }
        setStartTimeMs(0);
        setCurrentTimeMs(0);
        setElapsedMs(0);
      }
  );
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    socket.on("timerJoined", timerJoined);
    socket.on("timerStarted", timerStarted);
    socket.on("timerPaused", timerPaused);
    socket.on("timerResetted", timerResetted);
    socket.on("requestFailed", (errorCode) => {
      setErrorCode(errorMessages[errorCode]);
    });
  }, []);
  return <></>;
};
