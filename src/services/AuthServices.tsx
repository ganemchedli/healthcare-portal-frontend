import axios from "../config/axios";

export const register = (data: any) => axios.post("auth/register", data);

export const uploadImage = (imageData: any) =>
  axios.post("auth/image_upload", imageData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
