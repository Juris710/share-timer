import { Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { errorCodeState } from "../recoil";

const errorMessages: Record<ErrorCode, string> = {
  "invalid-timer-id": "指定されたタイマーは存在しません。",
  "invalid-token": "あなたにはこのタイマーを操作する権限がありません。",
};

export const ErrorDialog: React.FC = () => {
  const errorCode = useRecoilValue(errorCodeState);
  useEffect(() => {
    console.log(errorCode);
    if (errorCode !== undefined) {
      const message = errorMessages[errorCode];
      console.log(message);
      openModal({
        title: "エラー",
        children: <Text>{message}</Text>,
      });
    }
  }, [errorCode]);
  return <></>;
};
