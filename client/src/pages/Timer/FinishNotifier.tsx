import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { timerFinishedState } from "../../recoil";

export const FinishNotifier: React.FC = () => {
  const timerFinished = useRecoilValue(timerFinishedState);
  useEffect(() => {
    if (timerFinished) {
      showNotification({ message: "タイマー終了" });
    }
  }, [timerFinished]);

  return <></>;
};
