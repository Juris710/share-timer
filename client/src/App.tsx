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
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons";
import { Route, Routes } from "react-router-dom";
import { TimerPage } from "./pages/Timer";
import { Sockets } from "./components/Sockets";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { ErrorDialog } from "./components/ErrorDialog";
import { HomePage } from "./pages/Home";

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
        <ModalsProvider>
          <NotificationsProvider>
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
              <ErrorDialog />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/timer/:timerId" element={<TimerPage />} />
                <Route
                  path="/timer/:timerId/admin"
                  element={<TimerPage isAdmin />}
                />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </AppShell>
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
