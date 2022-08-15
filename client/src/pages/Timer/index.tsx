import React from "react";
import { Button, Center, Stack, Text } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { startTimeMsState, timerTextState } from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";

export const TimerPage: React.FC = () => {
  const timerText = useRecoilValue(timerTextState);
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  return (
    <Center>
      <Stack>
        <FinishNotifier />
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
