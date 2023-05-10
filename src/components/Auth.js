import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Box, Button, Typography } from "@mui/material";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography> Sign In With Google To Continue </Typography>
      <Button variant="contained" onClick={signInWithGoogle}>
        {" "}
        Sign In With Google{" "}
      </Button>
    </Box>
  );
};
