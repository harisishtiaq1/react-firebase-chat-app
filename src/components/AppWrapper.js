import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
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
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "500",
            // borderRadius: "0px 40px 0px 40px",
            backgroundColor: "blueViolet",
            fontStyle: "italic",
            color: "white",
          }}
        >
          <Typography>Chat App</Typography>
          {isAuth && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // mt: 3,
                position: "absolute",
                right: 20,
              }}
            >
              <Button variant="contained" onClick={signUserOut}>
                Sign Out
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 8 }}>{children}</Box>
    </>
  );
};
