import React, { useState } from "react";
import { Input, Button, List, Avatar } from "antd";
import {
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import "./index.css"; // Make sure to include this for custom styles

// Define interfaces for your messages and conversations
interface User {
  id: string;
  name: string;
  avatar: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  participants: User[];
  messages: Message[];
  lastMessage: string;
  lastMessageTime: Date;
}

// Sample data
const users: User[] = [
  {
    id: "u1",
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "u2",
    name: "Jane Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

const sampleConversations: Conversation[] = [
  {
    id: "c1",
    participants: [users[0], users[1]],
    messages: [
      {
        id: "m1",
        text: "Hi, how can I help you today?",
        senderId: "u1",
        timestamp: new Date(Date.now() - 10000000),
      },
      {
        id: "m2",
        text: "I have a question about my recent diagnosis.",
        senderId: "u2",
        timestamp: new Date(Date.now() - 9000000),
      },
      {
        id: "m3",
        text: "Of course, what would you like to know?",
        senderId: "u1",
        timestamp: new Date(Date.now() - 8000000),
      },
    ],
    lastMessage: "Of course, what would you like to know?",
    lastMessageTime: new Date(Date.now() - 8000000),
  },
];

const Messaging: React.FC = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(sampleConversations);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState<string>("");

  const sendMessage = () => {
    if (activeConversation && newMessage.trim()) {
      const newMessageObj: Message = {
        id: "m" + Math.random().toString(16).slice(2),
        text: newMessage,
        senderId: "u1",
        timestamp: new Date(),
      };
      // Update conversations here
      setNewMessage("");
    }
  };

  return (
    <div className="messenger">
      <div className="chat-list">
        <List
          itemLayout="horizontal"
          dataSource={conversations}
          renderItem={(item) => (
            <List.Item onClick={() => setActiveConversation(item)}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.participants.find((p) => p.id !== "u1")?.avatar}
                  />
                }
                title={item.participants.find((p) => p.id !== "u1")?.name}
                description={item.lastMessage}
              />
            </List.Item>
          )}
        />
      </div>
      <div className="chat-window">
        {activeConversation ? (
          <List
            dataSource={activeConversation.messages}
            renderItem={(message) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        users.find((user) => user.id === message.senderId)
                          ?.avatar
                      }
                    />
                  }
                  title={<span>{message.text}</span>}
                  description={message.timestamp.toLocaleTimeString()}
                />
              </List.Item>
            )}
          />
        ) : (
          <p>Select a conversation to start messaging</p>
        )}
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          suffix={
            <>
              <SmileOutlined
                style={{ color: "rgba(0,0,0,.45)", marginRight: "10px" }}
              />
              <PaperClipOutlined
                style={{ color: "rgba(0,0,0,.45)", marginRight: "10px" }}
              />
              <Button icon={<SendOutlined />} onClick={sendMessage}>
                Send
              </Button>
            </>
          }
        />
      </div>
    </div>
  );
};

export default Messaging;
