import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import {
  Box,
  Button,
  Input,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }
  const theme = createTheme({
    typography: {
      fontFamily: "Poppins, sans-serif",
      fontWeightBold: "600",
    },
    backgroundColor: "#F4F7FE",
  });
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        {!isInChat ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4" component="h4" sx-={{ mt: 3 }}>
              Type room name:
            </Typography>
            <Input
              placeholder="Enter Room Name Here"
              sx={{ mt: 4 }}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button
              sx={{ mt: 4 }}
              variant="contained"
              onClick={() => {
                setIsInChat(true);
              }}
            >
              Enter Chat
            </Button>
          </Box>
        ) : (
          <Chat room={room} />
        )}
      </AppWrapper>
    </ThemeProvider>
  );
}

export default ChatApp;
