import { useInterval } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentTimeMsState, shouldRunTimerState } from "../../recoil";

export const TimerRunner: React.FC = () => {
  const shouldRunTimer = useRecoilValue(shouldRunTimerState);
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
