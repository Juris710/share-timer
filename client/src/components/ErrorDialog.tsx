import { Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { errorMessageState } from "../recoil";

export const ErrorDialog: React.FC = () => {
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  useEffect(() => {
    if (errorMessage !== "") {
      openModal({
        title: "エラー",
        children: <Text>{errorMessage}</Text>,
        onClose: () => setErrorMessage(""),
      });
    }
  }, [errorMessage]);
  return <></>;
};
