import { Button, Center, Stack, Text } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { milliseconds2timerText } from "./utils";

export const Content: React.FC = () => {
  const [startMillis, setStartMillis] = useState(0);
  const [timerText, setTimerText] = useState(milliseconds2timerText(0));
  const interval = useInterval(() => {
    setTimerText(milliseconds2timerText(Date.now() - startMillis));
  }, 100);
  useEffect(() => {
    if (startMillis !== 0) {
      interval.start();
    }
    return interval.stop;
  }, [startMillis]);
  return (
    <Center>
      <Stack>
        <Text>{timerText}</Text>
        <Button
          onClick={() => {
            setTimerText(milliseconds2timerText(0));
            setStartMillis(Date.now());
          }}
          disabled={startMillis !== 0}
        >
          Start
        </Button>
        <Button onClick={() => setStartMillis(0)} disabled={startMillis === 0}>
          Stop
        </Button>
      </Stack>
    </Center>
  );
};
