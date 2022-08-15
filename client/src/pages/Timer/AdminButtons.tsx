import React from "react";
import { Button, Group } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { timerIdState, timerStateState } from "../../recoil";
import { socket } from "../../Sockets";

export const AdminButtons: React.FC = () => {
  const timerId = useRecoilValue(timerIdState);
  const timerState = useRecoilValue(timerStateState);
  const token = "token";
  if (timerId === undefined) {
    return <></>;
  }

  return (
    <Group>
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
