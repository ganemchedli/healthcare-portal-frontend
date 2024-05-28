import axios from "../config/axios";

export const register = (formData: FormData) =>
  axios.post("auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
