import React from "react";
import { Button, Group } from "@mantine/core";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  elapsedMsState,
  startTimeMsState,
} from "../../recoil";

export const AdminButtons: React.FC = () => {
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  const setElapsedMs = useSetRecoilState(elapsedMsState);
  const [currentTimeMs, setCurrentTimeMs] = useRecoilState(currentTimeMsState);

  return (
    <Group>
      <Button
        onClick={() => {
          setStartTimeMs(Date.now());
        }}
        disabled={startTimeMs !== 0}
      >
        Start
      </Button>
      <Button
        onClick={() => {
          setElapsedMs((elapsedMs) => elapsedMs + currentTimeMs - startTimeMs);
          setStartTimeMs(0);
          setCurrentTimeMs(0);
        }}
        disabled={startTimeMs === 0}
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
