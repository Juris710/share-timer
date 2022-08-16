import { openModal } from "@mantine/modals";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { timerStateState } from "../../recoil";

export const FinishNotifier: React.FC = () => {
  const timerState = useRecoilValue(timerStateState);
  useEffect(() => {
    if (timerState === "finished") {
      openModal({ title: "タイマー終了" });
    }
  }, [timerState]);

  return <></>;
};
