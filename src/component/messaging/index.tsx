import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { List, Input, Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";

interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  recipientId: string;
  content: string;
  timestamp: Date;
}

const { TextArea } = Input;

const Messaging: React.FC = () => {
  const [stompClient, setStompClient] = useState<any>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState("1"); // Example senderId
  const [recipientId, setRecipientId] = useState("2"); // Example recipientId

  const connect = () => {
    const socket = new SockJS("http://localhost:8088/chat-websocket");
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);
      client.subscribe(`/user/${recipientId}/queue/messages`, (data: any) => {
        onMessageReceived(JSON.parse(data.body));
      });
    });
  };

  useEffect(() => {
    connect();
    return () => {
      stompClient?.disconnect();
    };
  }, []);

  const onMessageReceived = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const sendMessage = () => {
    if (stompClient) {
      const chatMessage: ChatMessage = {
        id: "",
        chatId: "",
        senderId: userId,
        recipientId: recipientId,
        content: newMessage,
        timestamp: new Date(),
      };

      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setNewMessage("");
    }
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={`From ${item.senderId}`}
              description={`At ${item.timestamp.toLocaleTimeString()}`}
              avatar={<MessageOutlined />}
            />
            <div>{item.content}</div>
          </List.Item>
        )}
      />
      <TextArea
        rows={4}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a new message..."
      />
      <Button type="primary" onClick={sendMessage} style={{ marginTop: 10 }}>
        Send
      </Button>
    </div>
  );
};

export default Messaging;
