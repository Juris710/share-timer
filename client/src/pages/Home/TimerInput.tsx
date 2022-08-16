import { Group, MantineSize, NumberInput, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { durationMsState } from "../../recoil";

const TimerNumberInput: React.FC<{
  width: number;
  size: MantineSize;
  value: number;
  onChange: (value: number) => void;
  max?: number;
}> = ({ width, size, value, onChange, max = 60 }) => {
  return (
    <NumberInput
      min={0}
      max={max}
      required
      size={size}
      formatter={(value) => value?.padStart(2, "0") ?? "00"}
      stepHoldDelay={500}
      stepHoldInterval={100}
      styles={{ input: { width: width } }}
      value={value}
      onChange={onChange}
    />
  );
};

export const TimerInput: React.FC = () => {
  const size: MantineSize = "xl";
  const timerInputWidth = 100;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [durationMs, setDurationMs] = useRecoilState(durationMsState);
  useEffect(() => {
    let newValue = hours;
    newValue *= 60;
    newValue += minutes;
    newValue *= 60;
    newValue += seconds;
    newValue *= 1000;
    if (newValue !== durationMs) {
      console.log(newValue);
      setDurationMs(newValue);
    }
  }, [hours, minutes, seconds, durationMs]);
  return (
    <Group position="center">
      <TimerNumberInput
        width={timerInputWidth}
        size={size}
        value={hours}
        onChange={setHours}
        max={99}
      />
      <Text size={size}>:</Text>
      <TimerNumberInput
        width={timerInputWidth}
        size={size}
        value={minutes}
        onChange={setMinutes}
      />
      <Text size={size}>:</Text>
      <TimerNumberInput
        width={timerInputWidth}
        size={size}
        value={seconds}
        onChange={setSeconds}
      />
    </Group>
  );
};
