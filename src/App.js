import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import { ThemeProvider, createTheme } from "@mui/material";

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
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
      <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth}>
        <Chat room={room} />
      </AppWrapper>
    </ThemeProvider>
  );
}

export default ChatApp;
