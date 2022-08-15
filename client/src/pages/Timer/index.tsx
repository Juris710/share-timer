import React from "react";
import { Button, Center, Container, Group, Stack, Title } from "@mantine/core";
import { useRecoilState, useRecoilValue } from "recoil";
import { startTimeMsState, timerTextState } from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";

export const TimerPage: React.FC = () => {
  const timerText = useRecoilValue(timerTextState);
  const [startTimeMs, setStartTimeMs] = useRecoilState(startTimeMsState);
  return (
    <Container>
      <FinishNotifier />
      <TimerRunner />
      <Center>
        <Stack>
          <Center>
            <Title order={1}>{timerText}</Title>
          </Center>
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
              onClick={() => setStartTimeMs(0)}
              disabled={startTimeMs === 0}
            >
              Stop
            </Button>
          </Group>
        </Stack>
      </Center>
    </Container>
  );
};
