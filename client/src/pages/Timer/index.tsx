import React, { useEffect, useState } from "react";
import { Center, Container, Stack, Title } from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { remainingMsState, timerIdState } from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";
import { AdminButtons } from "./AdminButtons";
import { useParams } from "react-router-dom";
import { socket } from "../../Sockets";
import { milliseconds2timerText } from "../../utils";
/*
export const timerTextState = selector({
  key: "timerTextState",
  get: ({ get }) => {
    const remainingMs = get(remainingMsState);
    if (remainingMs === undefined) {
      return milliseconds2timerText(0);
    }
    if (remainingMs > 0) {
      return milliseconds2timerText(remainingMs);
    }
    return milliseconds2timerText(0);
  },
});
*/
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
  const remainingMs = useRecoilValue(remainingMsState);
  const [timerText, setTimerText] = useState("");

  useEffect(() => {
    let newValue = milliseconds2timerText(0);
    if (remainingMs !== undefined && remainingMs > 0) {
      newValue = milliseconds2timerText(remainingMs);
    }
    if (timerText !== newValue) {
      setTimerText(newValue);
    }
  }, [timerText, remainingMs]);

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
