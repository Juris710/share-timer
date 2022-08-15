import React from "react";
import { Center, Container, Stack, Title } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { timerTextState } from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";
import { AdminButtons } from "./AdminButtons";

export const TimerPage: React.FC<{ isAdmin?: boolean }> = ({
  isAdmin = false,
}) => {
  const timerText = useRecoilValue(timerTextState);
  return (
    <Container>
      <FinishNotifier />
      <TimerRunner />
      <Center>
        <Stack>
          <Center>
            <Title order={1}>{timerText}</Title>
          </Center>
          {isAdmin && <AdminButtons />}
        </Stack>
      </Center>
    </Container>
  );
};
