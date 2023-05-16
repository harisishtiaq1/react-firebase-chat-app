import {
  AppBar,
  Box,
  Button,
  IconButton,
  List,
  ListItemText,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "universal-cookie";
import React from "react";
const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontWeight: "500",
            backgroundColor: "blueViolet",
            fontStyle: "italic",
            color: "white",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>Chat App</Typography>
          {isAuth && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 20,
              }}
            >
              <IconButton onClick={handleClick} sx={{ color: "white", mr: 5 }}>
                <PersonIcon fontSize="large" />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 8 }}>{children}</Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <List sx={{ width: "100px", ml: 1 }}>
          <ListItemText sx={{ cursor: "pointer" }}>
            <Typography>User Profile</Typography>
          </ListItemText>
          <ListItemText onClick={signUserOut} sx={{ cursor: "pointer" }}>
            <Typography>Sign Out</Typography>
          </ListItemText>
        </List>
      </Popover>
    </>
  );
};
