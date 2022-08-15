import React from "react";
import { Button, Center, Container, Group, Stack, Title } from "@mantine/core";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  elapsedMsState,
  startTimeMsState,
  timerTextState,
} from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";

export const TimerPage: React.FC<{ isAdmin?: boolean }> = ({
  isAdmin = false,
}) => {
  const timerText = useRecoilValue(timerTextState);
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  const setElapsedMs = useSetRecoilState(elapsedMsState);
  const [currentTimeMs, setCurrentTimeMs] = useRecoilState(currentTimeMsState);
  return (
    <Container>
      <FinishNotifier />
      <TimerRunner />
      <Center>
        <Stack>
          <Center>
            <Title order={1}>{timerText}</Title>
          </Center>
          {isAdmin && (
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
                  setElapsedMs(
                    (elapsedMs) => elapsedMs + currentTimeMs - startTimeMs
                  );
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
                disabled={startTimeMs === 0}
              >
                Stop
              </Button>
            </Group>
          )}
        </Stack>
      </Center>
    </Container>
  );
};
