import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  Box,
  IconButton,
  InputBase,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MenuIcon from "@mui/icons-material/Menu";
import Picker from "emoji-picker-react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import Scrollbars from "react-custom-scrollbars";
const thumbStyle = {
  backgroundColor: "transparent",
  borderRadius: "6px",
  cursor: "pointer",
  width: "3px",
  height: "5px",
};
export const Chat = ({ room }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const messagesRef = collection(db, "messages");

  const handleEmojiIconClick = (event) => {
    setPopoverOpen(true);
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };
  const onEmojiClick = (emojiObject) => {
    setMessages((prevInput) => prevInput + emojiObject.emoji);
    setSelectedEmoji([...selectedEmoji, emojiObject.unified]);
    // setShowPicker(false);
  };
  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      const formattedMessages = messages.map((message, index) => {
        return {
          ...message,
          align: index % 2 === 0 ? "left" : "right",
        };
      });

      setMessages(formattedMessages);
    });

    return () => unsubscribe();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setNewMessage("");
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
        }}
      >
        <Paper
          sx={{
            background: "blueViolet",
            height: "30px",
            padding: 2,
            display: "flex",
            borderRadius: "0px 0px 0px 0px",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ color: "white", fontWeight: "500" }}>
            Haris here
          </Typography>
          <Stack direction="row">
            <IconButton sx={{ color: "white" }}>
              <VideoCallIcon fontSize="medium" />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <PersonAddIcon fontSize="medium" />
            </IconButton>
            <IconButton sx={{ color: "white" }}>
              <MenuIcon fontSize="medium" />
            </IconButton>
          </Stack>
        </Paper>
        <Scrollbars
          style={{ height: 430 }}
          autoHide={true}
          renderThumbVertical={({ style, ...props }) => (
            <div {...props} style={{ ...style, ...thumbStyle }} />
          )}
        >
          {messages &&
            messages.map((message, index) => (
              <>
                {message.user === auth.currentUser?.displayName ? (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "10px 10px 10px 10px",
                        display: "flex",
                        flexDirection: "row",
                        margin: "5px",
                        backgroundColor: "blueViolet",
                        width: "fit-content",
                        justifyContent: "flex-end",
                        color: "white",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                          ml: 1,
                          mr: 1,
                          mt: 2,
                          fontSize: "16px",
                          textTransform: "capitalize",
                          height: "40px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        {message.text}
                      </Typography>
                      {message.createdAt && (
                        <Typography sx={{ mt: 4, height: "20px", width: 100 }}>
                          {message.createdAt.toDate().toLocaleTimeString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ) : (
                  <Box
                    key={message.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        borderRadius: "10px 10px 10px 10px",
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                        backgroundColor: "black",
                        color: "white",
                        width: "fit-content",
                        justifyContent: "flex-end",
                        position: "relative",
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h6"
                        sx={{
                          fontSize: "16px",
                          ml: 1,
                          mr: 1,
                          mt: 2,
                          textTransform: "capitalize",
                          height: "40px",
                          fontWeight: "400",
                          width: "fit-content",
                        }}
                      >
                        {message.text}
                      </Typography>
                      {message.createdAt && (
                        <Typography sx={{ mt: 4, height: "20px", width: 90 }}>
                          {message.createdAt.toDate().toLocaleTimeString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                )}
              </>
            ))}
        </Scrollbars>

        <form onSubmit={handleSubmit}>
          <Stack direction="row" sx={{ bottom: 0, width: "100%" }}>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                backgroundColor: "black",
                color: "white",
                borderRadius: "10px",
              }}
            >
              <IconButton
                sx={{ color: "white" }}
                onClick={handleEmojiIconClick}
              >
                <EmojiEmotionsIcon />
              </IconButton>
              <InputBase
                sx={{ border: "none", borderRadius: 0, color: "white" }}
                type="text"
                fullWidth
                placeholder="Type Something"
                value={newMessage}
                autoComplete="off"
                onChange={(event) => setNewMessage(event.target.value)}
              />
              <IconButton sx={{ color: "white" }}>
                <CameraAltIcon />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <AttachFileIcon />
              </IconButton>
              {newMessage.length > 0 ? (
                <IconButton
                  sx={{
                    padding: 2,
                    backgroundColor: "blueviolet",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "blueViolet",
                    },
                    color: "white",
                  }}
                  variant="contained"
                  type="submit"
                >
                  <SendIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    padding: 2,
                    backgroundColor: "black",
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "black",
                    },
                    color: "white",
                  }}
                  variant="contained"
                  type="submit"
                >
                  <KeyboardVoiceIcon />
                </IconButton>
              )}
            </Paper>
          </Stack>
        </form>
      </Box>
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Picker onEmojiClick={onEmojiClick} />
      </Popover>
    </>
  );
};
