import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Link,
  List,
  ListItemText,
  Popover,
  Stack,
  Toolbar,
  Paper,
  InputBase,
  Drawer,
  Typography,
} from "@mui/material";
import person1 from "./Assets/A1.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import PersonIcon from "@mui/icons-material/Person";
import Cookies from "universal-cookie";
import React from "react";
const cookies = new Cookies();
const drawerWidth = 270;
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
      {isAuth && (
        <>
          <AppBar>
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontWeight: "500", fontSize: "20px" }}>
                ChatApp
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Link
                  sx={{
                    mr: 3,
                    my: 2,
                    fontSize: "17px",
                    cursor: "pointer",
                    color: "whiteSmoke",
                    textDecoration: "none",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Home
                </Link>
                <Link
                  sx={{
                    mr: 3,
                    my: 2,
                    fontSize: "17px",
                    cursor: "pointer",
                    color: "whiteSmoke",
                    textDecoration: "none",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Chat{" "}
                </Link>
                <Link
                  sx={{
                    mr: 3,
                    my: 2,
                    fontSize: "17px",
                    cursor: "pointer",
                    color: "whiteSmoke",
                    textDecoration: "none",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Contacts
                </Link>
                <Link
                  sx={{
                    mr: 3,
                    my: 2,
                    fontSize: "17px",
                    cursor: "pointer",
                    color: "whiteSmoke",
                    textDecoration: "none",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  About Us
                </Link>
                <Link
                  sx={{
                    mr: 3,
                    my: 2,
                    fontSize: "17px",
                    cursor: "pointer",
                    color: "whiteSmoke",
                    textDecoration: "none",
                    fontFamily: " Poppins, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  FAQS
                </Link>
                <IconButton onClick={handleClick} sx={{ color: "white" }}>
                  <PersonIcon fontSize="large" />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer
            sx={{
              "& .MuiDrawer-paper": {
                backgroundColor: "#1976D2",
                width: drawerWidth,
                flexShrink: 0,
                mt: 8,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              },
            }}
            variant="permanent"
            anchor="left"
          >
            <Divider sx={{ color: "white" }} />
            <Paper
              sx={{
                width: "250px",
                padding: 1,
                borderRadius: "16px",
                mt: 2,
              }}
            >
              <IconButton>
                <SearchIcon />
              </IconButton>
              <InputBase placeholder="Search" />
            </Paper>
            <Typography
              sx={{
                mt: 2,
                fontSize: "20px",
                fontWeight: "500",
                color: "white",
              }}
            >
              Chats
            </Typography>
            <Paper
              sx={{
                width: "250px",
                // height:'50px',
                padding: 3,
                borderRadius: "16px",
                mt: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stack direction="row">
                <Box
                  component="img"
                  src={person1}
                  sx={{
                    mr: 1,
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    // ml: 3,
                    mt: 1,
                  }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: "500", ml: 1, mt: 1 }}
                  >
                    Haris Ishtiaq
                  </Typography>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: "400", ml: 1, mt: 0.5 }}
                  >
                    This is my first message
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box
                  component="img"
                  src={person1}
                  sx={{
                    mr: 1,
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    // ml: 3,
                    mt: 1,
                  }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: "500", ml: 1, mt: 1 }}
                  >
                    Haris Ishtiaq
                  </Typography>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: "400", ml: 1, mt: 0.5 }}
                  >
                    This is my first message
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box
                  component="img"
                  src={person1}
                  sx={{
                    mr: 1,
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    // ml: 3,
                    mt: 1,
                  }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: "500", ml: 1, mt: 1 }}
                  >
                    Haris Ishtiaq
                  </Typography>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: "400", ml: 1, mt: 0.5 }}
                  >
                    This is my first message
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box
                  component="img"
                  src={person1}
                  sx={{
                    mr: 1,
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    // ml: 3,
                    mt: 1,
                  }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: "500", ml: 1, mt: 1 }}
                  >
                    Haris Ishtiaq
                  </Typography>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: "400", ml: 1, mt: 0.5 }}
                  >
                    This is my first message
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
              <Stack direction="row">
                <Box
                  component="img"
                  src={person1}
                  sx={{
                    mr: 1,
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    // ml: 3,
                    mt: 1,
                  }}
                />
                <Stack direction="column">
                  <Typography
                    sx={{ fontSize: "16px", fontWeight: "500", ml: 1, mt: 1 }}
                  >
                    Haris Ishtiaq
                  </Typography>
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: "400", ml: 1, mt: 0.5 }}
                  >
                    This is my first message
                  </Typography>
                </Stack>
              </Stack>
              <Divider />
            </Paper>
          </Drawer>
        </>
      )}
      <Box sx={{ mt: 8, ml: 35 }}>{children}</Box>
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
