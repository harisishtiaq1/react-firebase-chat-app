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
  Button,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
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
  console.log("messages", messages);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const  uid  = auth.currentUser;
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 2,
      }}
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
                    variant="h5"
                    component="h5"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      ml: 2,
                      mt: 2,
                      fontStyle: "italic",
                    }}
                  >
                    {message.user}:
                  </Typography>
                  <Typography
                    variant="h6"
                    component="h6"
                    sx={{
                      ml: 1,
                      mr: 1,
                      mt: 2,
                      fontSize: "12px",
                      textTransform: "capitalize",
                      height: "50px",
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
                    // alignItems: "flex-end",
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
                      variant="h5"
                      component="h5"
                      sx={{
                        fontWeight: "500",
                        ml: 2,
                        mt: 2,
                        fontStyle: "italic",
                        fontSize: "16px",
                      }}
                    >
                      {message.user}:
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{
                        fontSize: "14px",
                        ml: 1,
                        mr: 1,
                        mt: 2,
                        textTransform: "capitalize",
                        height: "50px",
                        fontWeight: "400",
                      }}
                    >
                      {message.text}
                    </Typography>
                  </Box>
                </Box>
              ))
            )}
          </>
        ))}

      <form onSubmit={handleSubmit} className="new-message-form">
        <Stack
          direction="row"
          sx={{ mb: 2, mt: 2, position: "fixed", bottom: 0, width: "100%" }}
        >
          <TextField
            type="text"
            fullWidth
            placeholder="Type your message here"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input"
          />
          <Button
            sx={{ ml: 3, padding: 2, width: 150 }}
            variant="contained"
            type="submit"
            className="send-button"
          >
            Send
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
