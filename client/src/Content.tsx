import { Button, Center, Stack, Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  shouldRunTimerState,
  startTimeMsState,
  timerTextState,
} from "./recoil";

const TimerRunner: React.FC = () => {
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

export const Content: React.FC = () => {
  const timerText = useRecoilValue(timerTextState);
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  return (
    <Center>
      <Stack>
        <TimerRunner />
        <Text>{timerText}</Text>
        <Button
          onClick={() => {
            setStartTimeMs(Date.now());
          }}
          disabled={startTimeMs !== 0}
        >
          Start
        </Button>
        <Button onClick={() => setStartTimeMs(0)} disabled={startTimeMs === 0}>
          Stop
        </Button>
      </Stack>
    </Center>
  );
};
