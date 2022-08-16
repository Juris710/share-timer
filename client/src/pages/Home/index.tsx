import { Button, Center, Container, Stack } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import { socket } from "../../components/Sockets";
import { durationMsState, errorMessageState } from "../../recoil";
import { localStorageKeyOfTimerToken } from "../../utils";
import { TimerInput } from "./TimerInput";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const setErrorMessage = useSetRecoilState(errorMessageState);
  const createTimer = useRecoilCallback(({ snapshot }) => async () => {
    const durationMs = await snapshot.getPromise(durationMsState);
    if (durationMs === undefined || durationMs === 0) {
      setErrorMessage("0秒のタイマーは作成できません。");
      return;
    }
    socket.emit("createTimer", durationMs, (timerId, token) => {
      localStorage.setItem(localStorageKeyOfTimerToken(timerId), token);
      navigate(`timer/${timerId}/admin`);
    });
  });
  return (
    <Container>
      <Stack>
        <TimerInput />
        <Center>
          <Button onClick={createTimer}>Create</Button>
        </Center>
      </Stack>
    </Container>
  );
};
