import {
  ActionIcon,
  Alert,
  CopyButton,
  Group,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconInfoCircle } from "@tabler/icons";
import React from "react";
import { useRecoilValue } from "recoil";
import { timerIdState } from "../../recoil";

export const AdminUrlDisplay: React.FC = () => {
  const timerId = useRecoilValue(timerIdState);
  if (timerId === undefined) {
    return <></>;
  }
  const url = `${location.origin}/timer/${timerId}`;
  return (
    <Alert title="タイマー共有リンク" icon={<IconInfoCircle size={16} />}>
      <Group position="center">
        <Text>{url}</Text>
        <CopyButton value={url} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
    </Alert>
  );
};
