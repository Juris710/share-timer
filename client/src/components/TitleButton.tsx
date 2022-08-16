import { Group, Title, UnstyledButton } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  currentTimeMsState,
  durationMsState,
  elapsedMsState,
  startTimeMsState,
  timerIdState,
} from "../recoil";

export const TitleButton: React.FC = () => {
  const navigate = useNavigate();
  const setDurationMs = useSetRecoilState(durationMsState);
  const setStartTimeMs = useSetRecoilState(startTimeMsState);
  const setCurrentTimeMs = useSetRecoilState(currentTimeMsState);
  const setElapsedMs = useSetRecoilState(elapsedMsState);
  const setTimerId = useSetRecoilState(timerIdState);
  return (
    <Group position="apart" sx={{ height: "100%" }} px={20}>
      <UnstyledButton
        onClick={() => {
          setStartTimeMs(0);
          setCurrentTimeMs(0);
          setElapsedMs(0);
          setDurationMs(undefined);
          setTimerId(undefined);
          navigate("/");
        }}
      >
        <Title order={1}>Share Timer</Title>
      </UnstyledButton>
    </Group>
  );
};
