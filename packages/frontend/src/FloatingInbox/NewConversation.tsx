import React, { useCallback, useState, useEffect } from "react";
import { MessageInput } from "./MessageInput";
import { useStartConversation, CachedConversation, getDbInstance, getLastMessage, useClient } from "@xmtp/react-sdk";

interface NewConversationProps {
  selectConversation: (conversation: CachedConversation) => void;
  peerAddress: string;
  isPWA?: boolean;
}

export const NewConversation: React.FC<NewConversationProps> = ({ selectConversation, peerAddress, isPWA = false }) => {
  const { startConversation } = useStartConversation();
  const [ currentMessages, setMessages] = useState<string[]>([]); // State to store messages
  const [ currentConversation, setCurrentConversation] = useState<any>()
  const { client, error, isLoading, initialize, disconnect } = useClient();
  
  useEffect(() => {
    if (!client) return;

    const fetchMessages = async () => {
      try {
        const stream = await client.conversations.streamAllMessages();
        console.log("Listening for messages...");

        for await (const message of stream) {
          console.log("Received message:", message.content);
          setMessages((prevMessages) => [...prevMessages, message.content]);
        }
      } catch (error) {
        console.error("Error in message stream:", error);
      }
    };

    fetchMessages();

  }, [client]);


  const styles: { [key: string]: React.CSSProperties } = {
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      height: "100%",
      border: "1px solid #ccc",
      padding: "10px",
      overflowY: "auto",
    },
    messageList: {
      marginBottom: "10px",
    },
    messageItem: {
      padding: "5px",
      borderBottom: "1px solid #eee",
    },
    buttonContainer: {
      marginTop: "10px",
      display: "flex",
      justifyContent: "center",
    },
    button: {
      padding: "10px 20px",
      cursor: "pointer",
      backgroundColor: "#007BFF",
      color: "#FFF",
      border: "none",
      borderRadius: "5px",
    },
  };

  const handleSendMessage = useCallback(
    async (message: string) => {
      console.log(`new conversation: ${message}`);
      if (!message.trim()) {
        alert("Empty message");
        return;
      }
      if (!peerAddress) {
        alert("No peer address provided");
        return;
      }

      // Save the message locally before sending
      // setMessages((prevMessages) => [...prevMessages, message]);

      // Start conversation and send the message
      const newConversation = await startConversation(peerAddress, message);
      setCurrentConversation(newConversation)
      if (newConversation?.cachedConversation) {
        selectConversation(newConversation.cachedConversation);
      }
      
    },
    [peerAddress, startConversation, selectConversation]
  );

  const handleReceiveMessage = async () => {
    // const stream = await client?.conversations.streamAllMessages();
    // console.log(stream)
    // try {
    //   for await (const message of stream as any) {
    //     console.log("here")
    //     // Received a message
    //     console.log(message.content)
    //     setMessages((prevMessages) => [...prevMessages, message])
    //   }
    // } catch (error) {
    //   // log any stream errors
    //   console.error(error);
    // }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Display messages */}
      <div style={styles.messagesContainer}>
        <div style={styles.messageList}>
          {currentMessages.map((msg, index) => (
            <div key={index} style={styles.messageItem}>
              {msg}
            </div>
          ))}
        </div>
      </div>
      {/* Button to receive a new message */}
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleReceiveMessage}>
          Get New Message
        </button>
      </div>
      {/* Message input */}
      <MessageInput onSendMessage={handleSendMessage} isPWA={isPWA} />
    </div>
  );
};
