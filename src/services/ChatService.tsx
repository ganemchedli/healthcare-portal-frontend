import "../config/axios";
import axios from "../config/axios";

export const signup_ = async (
  username: string,
  secret: string,
  email: string,
  first_name: string,
  last_name: string
) => {
  axios.post("chat/signup", {
    username,
    secret,
    email,
    first_name,
    last_name,
  });
};

export const login_ = async (username: string, secret: string) => {
  axios.post("chat/login", {
    username,
    secret,
  });
};
