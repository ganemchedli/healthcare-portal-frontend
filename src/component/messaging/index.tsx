import React, { useState, useEffect, useRef, useCallback } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
  Layout,
  Form,
  Input,
  Button,
  List,
  Avatar,
  Typography,
  message as AntdMessage,
} from "antd";
import "./index.css";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Messaging: React.FC = () => {
  const [fullname, setFullname] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messageInput, setMessageInput] = useState<string>("");

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedFullname = localStorage.getItem("User email");
    if (storedFullname) {
      setFullname(storedFullname);
      setIsConnected(true);
      const socket = new SockJS("http://localhost:8088/chat-websocket");
      const stomp = Stomp.over(socket);
      setStompClient(stomp);
    } else {
      AntdMessage.error("Fullname not found in localStorage");
    }
  }, []);

  useEffect(() => {
    if (stompClient) {
      stompClient.connect({}, onConnected, onError);
    }
  }, [stompClient]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const onConnected = useCallback(() => {
    if (fullname) {
      stompClient.subscribe(
        `/user/${fullname}/queue/messages`,
        onMessageReceived
      );
      stompClient.subscribe(`/user/public`, onMessageReceived);

      stompClient.send(
        "/app/user.addUser",
        {},
        JSON.stringify({
          nickName: fullname,
          fullName: fullname,
          status: "ONLINE",
        })
      );
      findAndDisplayConnectedUsers();
    }
  }, [fullname, stompClient]);

  const findAndDisplayConnectedUsers = useCallback(async () => {
    try {
      const connectedUsersResponse = await fetch("/users");
      let users = await connectedUsersResponse.json();
      users = users.filter((user: any) => user.nickName !== fullname);
      setConnectedUsers(users);
    } catch (error) {
      AntdMessage.error("Error fetching connected users");
    }
  }, [fullname]);

  const onMessageReceived = useCallback(
    (payload: any) => {
      const message = JSON.parse(payload.body);
      setMessages((prevMessages) => [...prevMessages, message]);
      findAndDisplayConnectedUsers();
    },
    [findAndDisplayConnectedUsers]
  );

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (messageInput && stompClient) {
      const chatMessage = {
        senderId: fullname,
        recipientId: selectedUserId,
        content: messageInput,
        timestamp: new Date(),
      };
      stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
      setMessages((prevMessages) => [...prevMessages, chatMessage]);
      setMessageInput("");
    }
  };

  const userItemClick = (userId: string) => {
    setSelectedUserId(userId);
    fetchAndDisplayUserChat(userId);
  };

  const fetchAndDisplayUserChat = async (userId: string) => {
    try {
      const userChatResponse = await fetch(`/messages/${fullname}/${userId}`);
      const userChat = await userChatResponse.json();
      setMessages(userChat);
    } catch (error) {
      AntdMessage.error("Error fetching user chat");
    }
  };

  const onError = () => {
    AntdMessage.error(
      "Could not connect to WebSocket server. Please refresh this page to try again!"
    );
  };

  const onLogout = () => {
    if (stompClient) {
      stompClient.send(
        "/app/user.disconnectUser",
        {},
        JSON.stringify({
          nickName: fullname,
          fullName: fullname,
          status: "OFFLINE",
        })
      );
    }
    window.location.reload();
  };

  return (
    <Layout className="app">
      {isConnected && (
        <Layout>
          <Sider width={200} className="site-layout-background">
            <div className="users-list-container">
              <Title level={4}>Online Users</Title>
              <List
                itemLayout="horizontal"
                dataSource={connectedUsers}
                renderItem={(user) => (
                  <List.Item
                    key={user.nickName}
                    className={`user-item ${
                      selectedUserId === user.nickName ? "active" : ""
                    }`}
                    onClick={() => userItemClick(user.nickName)}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src="../src/assets/photo.jpg" />}
                      title={user.fullName}
                    />
                  </List.Item>
                )}
              />
            </div>
            <div>
              <Text id="connected-user-fullname">{fullname}</Text>
            </div>
          </Sider>
          <Layout>
            <Header className="chat-header">
              <Title level={4}>{fullname}</Title>
            </Header>
            <Content
              className="chat-content"
              id="chat-messages"
              ref={chatAreaRef}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${
                    message.senderId === fullname ? "sender" : "receiver"
                  }`}
                >
                  <p>{message.content}</p>
                </div>
              ))}
            </Content>
            <Form
              className={`message-form ${selectedUserId ? "" : "hidden"}`}
              onFinish={sendMessage}
            >
              <Form.Item>
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
};

export default Messaging;

// import React, { useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
// import { List, Input, Button } from "antd";
// import { MessageOutlined } from "@ant-design/icons";

// interface ChatMessage {
//   id: string;
//   chatId: string;
//   senderId: string;
//   recipientId: string;
//   content: string;
//   timestamp: Date;
// }

// const { TextArea } = Input;

// const Messaging: React.FC = () => {
//   const [stompClient, setStompClient] = useState<any>(null);
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [userId, setUserId] = useState("1"); // Example senderId
//   const [recipientId, setRecipientId] = useState("2"); // Example recipientId

//   const connect = () => {
//     const socket = new SockJS("http://localhost:8088/chat-websocket");
//     const client = Stomp.over(socket);

//     client.connect({}, () => {
//       setStompClient(client);
//       client.subscribe(`/user/${recipientId}/queue/messages`, (data: any) => {
//         onMessageReceived(JSON.parse(data.body));
//       });
//     });
//   };

//   useEffect(() => {
//     connect();
//     return () => {
//       stompClient?.disconnect();
//     };
//   }, []);

//   const onMessageReceived = (message: ChatMessage) => {
//     setMessages((prevMessages) => [...prevMessages, message]);
//   };

//   const sendMessage = () => {
//     if (stompClient) {
//       const chatMessage: ChatMessage = {
//         id: "",
//         chatId: "",
//         senderId: userId,
//         recipientId: recipientId,
//         content: newMessage,
//         timestamp: new Date(),
//       };

//       stompClient.send("/app/chat", {}, JSON.stringify(chatMessage));
//       setNewMessage("");
//     }
//   };

//   return (
//     <div>
//       <List
//         itemLayout="horizontal"
//         dataSource={messages}
//         renderItem={(item) => (
//           <List.Item>
//             <List.Item.Meta
//               title={`From ${item.senderId}`}
//               description={`At ${item.timestamp.toLocaleTimeString()}`}
//               avatar={<MessageOutlined />}
//             />
//             <div>{item.content}</div>
//           </List.Item>
//         )}
//       />
//       <TextArea
//         rows={4}
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         placeholder="Type a new message..."
//       />
//       <Button type="primary" onClick={sendMessage} style={{ marginTop: 10 }}>
//         Send
//       </Button>
//     </div>
//   );
// };

// export default Messaging;
