import React from "react";
import { Button, Group } from "@mantine/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  elapsedMsState,
  startTimeMsState,
  timerStateState,
} from "../../recoil";

export const AdminButtons: React.FC = () => {
  const timerState = useRecoilValue(timerStateState);
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  const setElapsedMs = useSetRecoilState(elapsedMsState);
  const [currentTimeMs, setCurrentTimeMs] = useRecoilState(currentTimeMsState);

  return (
    <Group>
      <Button
        onClick={() => {
          setStartTimeMs(Date.now());
        }}
        disabled={timerState !== "idle" && timerState !== "paused"}
      >
        Start
      </Button>
      <Button
        onClick={() => {
          setElapsedMs((elapsedMs) => elapsedMs + currentTimeMs - startTimeMs);
          setStartTimeMs(0);
          setCurrentTimeMs(0);
        }}
        disabled={timerState !== "running"}
      >
        Pause
      </Button>
      <Button
        onClick={() => {
          setStartTimeMs(0);
          setCurrentTimeMs(0);
          setElapsedMs(0);
        }}
      >
        Reset
      </Button>
    </Group>
  );
};
