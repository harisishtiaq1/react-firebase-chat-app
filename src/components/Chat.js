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
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Recorder } from "react-voice-recorder";
import "react-voice-recorder/dist/index.css";
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
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [timeStamp, setTimeStamp] = useState(null);
  const messagesRef = collection(db, "messages");

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
    const timeStamp = serverTimestamp();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: timeStamp,
      user: auth.currentUser.displayName,
      room,
    });
    setTimeStamp(timeStamp);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
      }}
    >
      <Scrollbars
        style={{ height: 490 }}
        autoHide={true}
        renderThumbVertical={({ style, ...props }) => (
          <div {...props} style={{ ...style, ...thumbStyle }} />
        )}
      >
        {messages &&
          messages.map((message) => (
            <>
              {message.user === auth.currentUser?.displayName ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Box
                    key={message.id}
                    sx={{
                      borderRadius: "10px 10px 10px 10px",
                      display: "flex",
                      flexDirection: "row",
                      margin: "5px",
                      backgroundColor: "blue",
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
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                </Box>
              ) : (
                (console.log("info here", message.user, auth.currentUser),
                (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      key={message.id}
                      sx={{
                        borderRadius: "10px 10px 10px 10px",
                        display: "flex",
                        flexDirection: "row",
                        margin: "10px",
                        backgroundColor: "grey",
                        color: "black",
                        width: "fit-content",
                        justifyContent: "flex-end",
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
                        }}
                      >
                        {message.text}
                      </Typography>
                      {timeStamp && (
                        <Typography>
                          {timeStamp.toDate().toLocaleString()}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))
              )}
            </>
          ))}
      </Scrollbars>

      <form onSubmit={handleSubmit}>
        <Stack direction="row" sx={{ mb: 2, mt: 2, bottom: 0, width: "100%" }}>
          <Paper
            sx={{
              width: "100%",
              display: "flex",
            }}
          >
            <IconButton>
              <EmojiEmotionsIcon />
            </IconButton>
            <TextField
              sx={{ border: "none", borderRadius: 0 }}
              type="text"
              fullWidth
              placeholder="Type Something"
              value={newMessage}
              autoComplete="off"
              onChange={(event) => setNewMessage(event.target.value)}
            />
            <IconButton>
              <CameraAltIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
          </Paper>
          {newMessage.length > 0 ? (
            <IconButton
              sx={{
                ml: 3,
                padding: 2,
                width: 150,
                backgroundColor: "lightblue",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "lightblue",
                },
              }}
              variant="contained"
              type="submit"
            >
              <SendIcon />
            </IconButton>
          ) : (
            <IconButton
              sx={{
                ml: 3,
                padding: 2,
                width: 150,
                backgroundColor: "lightblue",
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: "lightblue",
                },
              }}
              variant="contained"
              type="submit"
            >
              <KeyboardVoiceIcon />
            </IconButton>
          )}
        </Stack>
      </form>
    </Box>
  );
};
