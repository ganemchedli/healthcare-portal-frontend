import axios from "../config/axios";

export const register = (formData: FormData) =>
  axios.post("auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const authenticate = async (data: any) =>
  axios.post("auth/authenticate", data);
