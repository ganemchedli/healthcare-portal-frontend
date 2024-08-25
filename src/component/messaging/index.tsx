import { useEffect, useState } from "react";
import { getUserByEmailClient } from "../../services/UserServices";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { login_, signup_ } from "../../services/ChatService";

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
      // If login fails, sign up the user
      await signup(username, secret, email, firstName, lastName);
      // Attempt to login again after signup
      await login(username, secret);
      setIsAuthenticated(true); // Set as authenticated after successful signup
    }
  };

  const login = async (username: string, secret: string) => {
    try {
      const response = await login_(username, secret);
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
      const response = await signup_(
        username,
        secret,
        email,
        first_name,
        last_name
      );
      console.log("Signup response", response);
    } catch (error) {
      throw new Error("Signup failed");
    }
  };

  return (
    <div style={{ height: "80vh", width: "80vw" }}>
      {isAuthenticated ? (
        <PrettyChatWindow
          projectId={"10b6dc4d-b533-48fc-8790-0dc7d5c1b635"}
          username={username}
          secret={secret}
          style={{ height: "100%" }}
        />
      ) : (
        <div className="text-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </div>
      )}
    </div>
  );
};

export default Messaging;
