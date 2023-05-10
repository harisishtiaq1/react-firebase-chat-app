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
import { Box, Button, Input, Stack, Typography } from "@mui/material";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  console.log("messages");
  console.log("messages");
  console.log("messages");
  console.log("messages");
  console.log(messages);

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        console.log("doc");
        console.log("doc");
        console.log("doc");
        console.log(doc);
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);
  console.log("messages", messages);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
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
      <div className="header">
        <Typography variant="h5" component="h5" sx={{ fontWeight: "500" }}>
          Welcome to: {room.toUpperCase()}
        </Typography>
      </div>
      <Box sx={{ border: "2px solid black", margin: 3 }}>
        {messages.map((message) => (
          <Box key={message.id} sx={{ display: "flex", flexDirection: "row" }}>
            <Typography sx={{ fontWeight: "500" }}>{message.user}:</Typography>
            <Typography
              sx={{
                ml: 1,
                textTransform: "capitalize",
                color: "grey",
                width: "500px",
                height: "50px",
              }}
            >
              {message.text}
            </Typography>
          </Box>
        ))}
      </Box>
      <Stack direction="column" sx={{ mt: 3 }}>
        <form onSubmit={handleSubmit} className="new-message-form">
          <Input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            className="new-message-input"
            placeholder="Type your message here..."
          />
          <Button
            sx={{ ml: 3 }}
            variant="contained"
            type="submit"
            className="send-button"
          >
            Send
          </Button>
        </form>
      </Stack>
    </Box>
  );
};
