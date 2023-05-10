import { Box, Button, Typography } from "@mui/material";
import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "500",
          borderRadius: "0px 40px 0px 40px",
          backgroundColor: "blueViolet",
          fontStyle: "italic",
          color: "white",
        }}
      >
        Chat App
      </Typography>

      <div className="app-container">{children}</div>
      {isAuth && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button variant="contained" onClick={signUserOut}>
            Sign Out
          </Button>
        </Box>
      )}
    </>
  );
};
