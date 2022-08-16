import React, { useEffect, useState } from "react";
import { Center, Container, Stack, Title } from "@mantine/core";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  errorMessageState,
  remainingMsState,
  timerIdState,
} from "../../recoil";
import { TimerRunner } from "./Runner";
import { FinishNotifier } from "./FinishNotifier";
import { AdminButtons } from "./AdminButtons";
import { useParams } from "react-router-dom";
import { errorMessages, socket } from "../../components/Sockets";
import {
  localStorageKeyOfTimerToken,
  milliseconds2timerText,
} from "../../utils";

export const TimerPage: React.FC<{ isAdmin?: boolean }> = ({
  isAdmin = false,
}) => {
  const { timerId } = useParams();
  const setTimerId = useSetRecoilState(timerIdState);
  const setErrorMessage = useSetRecoilState(errorMessageState);
  useEffect(() => {
    setTimerId(timerId);
    if (timerId !== undefined) {
      if (isAdmin) {
        const token = localStorage.getItem(
          localStorageKeyOfTimerToken(timerId)
        );
        if (typeof token !== "string") {
          setErrorMessage(errorMessages["invalid-token"]);
          return;
        }
        socket.emit("joinTimer", timerId, token);
      } else {
        socket.emit("joinTimer", timerId);
      }
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
