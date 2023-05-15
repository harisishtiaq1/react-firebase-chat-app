import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import { Box, Button, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
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
        mt: 3,
      }}
    >
      <Typography
        variant="h4"
        component="h4"
        sx={{ fontWeight: "400", mt: 3, fontStyle: "italic" }}
      >
        SignIn
      </Typography>
      <TextField sx={{ mt: 2, width: 300 }} label="Email" />
      <TextField sx={{ mt: 2, width: 300 }} label="Password" />
      <Button variant="contained" sx={{ mt: 3, width: "300px" }}>
        SignIn
      </Button>
      <Button
        startIcon={<GoogleIcon />}
        sx={{ mt: 3, width: "300px" }}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In With Google
      </Button>
      <Button
        startIcon={<FacebookIcon />}
        sx={{ mt: 3, width: "300px" }}
        variant="contained"
        onClick={signInWithGoogle}
      >
        Sign In With Facebook
      </Button>
    </Box>
  );
};
