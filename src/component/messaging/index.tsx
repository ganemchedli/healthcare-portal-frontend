import { useEffect, useState } from "react";
import axios from "axios";
import { getUserByEmailClient } from "../../services/UserServices";
import { PrettyChatWindow } from "react-chat-engine-pretty";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: number;
  birthday: string;
  state: string;
  city: string;
  zipCode: number;
  role: string;
}

const Messaging: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const email = localStorage.getItem("User email") || "";
  const username = email.split("@")[0];

  useEffect(() => {
    getUser(email);
  }, [email]);

  useEffect(() => {
    if (firstName && lastName && secret) {
      handleUserAuthentication();
    }
  }, [firstName, lastName, secret]);

  const getUser = async (email: string) => {
    try {
      const response = await getUserByEmailClient(email);
      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setSecret(response.data.password);
    } catch (error) {
      console.error("User not found");
    }
  };

  const handleUserAuthentication = async () => {
    try {
      // Attempt to login
      await login(username, secret);
      setIsAuthenticated(true); // Set as authenticated after successful login
    } catch (error) {
      console.log("User does not exist, attempting to sign up.");

      // If login fails, sign up the user
      await signup(username, secret, email, firstName, lastName);
      // Attempt to login again after signup
      await login(username, secret);
      setIsAuthenticated(true); // Set as authenticated after successful signup
    }
  };

  const login = async (username: string, secret: string) => {
    try {
      const response = await axios.post("http://localhost:3001/login", {
        username,
        secret,
      });
      console.log("Login response", response);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const signup = async (
    username: string,
    secret: string,
    email: string,
    first_name: string,
    last_name: string
  ) => {
    try {
      const response = await axios.post("http://localhost:3001/signup", {
        username,
        secret,
        email,
        first_name,
        last_name,
      });
      console.log("Signup response", response);
    } catch (error) {
      throw new Error("Signup failed");
    }
  };

  return (
    <div style={{ height: "80vh", width: "80vw" }}>
      {isAuthenticated ? (
        // <PrettyChatWindow
        //   projectId={"10b6dc4d-b533-48fc-8790-0dc7d5c1b635"}
        //   username={username}
        //   secret={secret}
        //   style={{ height: "100%" }}
        // />
        <ChatEngine
			projectID='00000000-0000-0000-0000-000000000000'
			userName='adam'
			userSecret='pass1234'
			// Render Custom Components
			height='100vh'
			renderChatList={(chatAppState) => {}}
			renderChatCard={(chat, index) => {}}
			renderNewChatForm={(creds) => {}}
			renderChatFeed={(chatAppState) => {}}
			renderChatHeader={(chat) => {}}
			renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => {}}
			renderIsTyping={(typers) => {}}
			renderNewMessageForm={(creds, chatId) => {}}
			renderChatSettings={(chatAppState) => {}}
			renderChatSettingsTop={(creds, chat) => {}}
			renderPeopleSettings={(creds, chat) => {}}
			renderPhotosSettings={(chat) => {}}
			renderOptionsSettings={(creds, chat) => {}}
		/>
      ) : (
        <div>Loading chat...</div>
      )}
    </div>
  );
};

export default Messaging;
