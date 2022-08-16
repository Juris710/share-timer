import React from "react";
import { Button, Group, Stack, Text } from "@mantine/core";
import { useRecoilValue } from "recoil";
import { timerIdState, timerStateState } from "../../recoil";
import { socket } from "../../components/Sockets";
import { localStorageKeyOfTimerToken } from "../../utils";
import { IconTrash } from "@tabler/icons";
import { openConfirmModal } from "@mantine/modals";

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
    <Stack>
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
      <Group position="center">
        <Button
          color="red"
          leftIcon={<IconTrash />}
          onClick={() => {
            openConfirmModal({
              title: "確認",
              children: (
                <Stack>
                  <Text>このタイマーを削除してもよろしいですか?</Text>
                  <Text>この操作は取り消せません。</Text>
                </Stack>
              ),
              labels: { confirm: "削除", cancel: "キャンセル" },
              confirmProps: { color: "red" },
              onConfirm: () => {
                socket.emit("deleteTimer", timerId, token);
                localStorage.removeItem(localStorageKeyOfTimerToken(timerId));
              },
            });
          }}
        >
          Delete this timer
        </Button>
      </Group>
    </Stack>
  );
};
