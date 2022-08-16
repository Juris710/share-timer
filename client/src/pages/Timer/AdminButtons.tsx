import React from "react";
import { Button, Group } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { timerIdState, timerStateState } from "../../recoil";
import { socket } from "../../components/Sockets";
import { localStorageKeyOfTimerToken } from "../../utils";

export const AdminButtons: React.FC = () => {
  const timerId = useRecoilValue(timerIdState);
  const timerState = useRecoilValue(timerStateState);
  if (timerId === undefined) {
    return <></>;
  }
  const token = localStorage.getItem(localStorageKeyOfTimerToken(timerId));
  if (typeof token !== "string") {
    return <></>;
  }

  return (
    <Group position="center">
      <Button
        onClick={() => socket.emit("startTimer", timerId, token)}
        disabled={timerState !== "idle" && timerState !== "paused"}
      >
        Start
      </Button>
      <Button
        onClick={() => socket.emit("pauseTimer", timerId, token)}
        disabled={timerState !== "running"}
      >
        Pause
      </Button>
      <Button onClick={() => socket.emit("resetTimer", timerId, token)}>
        Reset
      </Button>
    </Group>
  );
};
