import { showNotification } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { timerStateState } from "../../recoil";

export const FinishNotifier: React.FC = () => {
  const timerState = useRecoilValue(timerStateState);
  useEffect(() => {
    if (timerState === "finished") {
      showNotification({ message: "タイマー終了" });
    }
  }, [timerState]);

  return <></>;
};
