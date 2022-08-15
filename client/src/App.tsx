import React from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  AppShell,
  Header,
  Title,
  Group,
  ActionIcon,
  Button,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { Route, Routes } from "react-router-dom";
import { TimerPage } from "./pages/Timer";
import { socket, Sockets } from "./Sockets";

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "share-timer-color-scheme",
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        withNormalizeCSS
        withGlobalStyles
        theme={{ colorScheme }}
      >
        <AppShell
          padding="md"
          header={
            <Header height={70} p="xs">
              <Group position="apart" sx={{ height: "100%" }} px={20}>
                <Title order={1}>Share Timer</Title>
                <ActionIcon
                  variant="default"
                  onClick={() => toggleColorScheme()}
                  size={30}
                >
                  {colorScheme === "dark" ? (
                    <IconSun size={16} />
                  ) : (
                    <IconMoonStars size={16} />
                  )}
                </ActionIcon>
              </Group>
            </Header>
          }
        >
          <Sockets />
          <Routes>
            <Route path="/" element={<TimerPage />} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
          <Button
            onClick={() => {
              socket.emit("ping");
            }}
          >
            ping
          </Button>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
