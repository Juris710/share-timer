import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  durationMsState,
  remainingMsState,
  startTimeMsState,
} from "../../recoil";

export const TimerRunner: React.FC = () => {
  const durationMs = useRecoilValue(durationMsState);
  const startTimeMs = useRecoilValue(startTimeMsState);
  const remainingMs = useRecoilValue(remainingMsState);
  const [shouldRunTimer, setShouldRunTimer] = useState(false);

  useEffect(() => {
    let newValue = true;
    if (durationMs === 0) {
      newValue = false;
    } else if (startTimeMs === 0) {
      newValue = false;
    } else if (remainingMs === undefined || remainingMs <= 0) {
      newValue = false;
    }
    if (shouldRunTimer !== newValue) {
      setShouldRunTimer(newValue);
    }
  }, [shouldRunTimer, durationMs, startTimeMs, remainingMs]);

  const setCurrentTimeMs = useSetRecoilState(currentTimeMsState);
  const interval = useInterval(() => {
    setCurrentTimeMs(Date.now());
  }, 100);
  useEffect(() => {
    if (shouldRunTimer) {
      interval.start();
    }
    return interval.stop;
  }, [shouldRunTimer]);
  return <></>;
};
