import React, { useState, useEffect } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { Box, Button, Input, Stack, Typography } from "@mui/material";

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

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography> Type room name: </Typography>
          <Input sx={{ mt: 4 }} onChange={(e) => setRoom(e.target.value)} />

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
  );
}

export default ChatApp;
