import React, { useEffect } from "react";
import { Center, Container, Stack, Title } from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { timerIdState, timerTextState } from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";
import { AdminButtons } from "./AdminButtons";
import { useParams } from "react-router-dom";
import { socket } from "../../Sockets";

export const TimerPage: React.FC<{ isAdmin?: boolean }> = ({
  isAdmin = false,
}) => {
  const { timerId } = useParams();
  const setTimerId = useSetRecoilState(timerIdState);
  useEffect(() => {
    setTimerId(timerId);
    if (timerId !== undefined) {
      socket.emit("joinTimer", timerId);
    }
  }, [timerId]);

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
