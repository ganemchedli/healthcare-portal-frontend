import axios from "../config/axios";

export const listUsers = () => axios.get("auth/get_all_users");

export const getUserByEmail = () => axios.get("auth/me");

export const getUser = (userId: any) => axios.get("auth/get_user/" + userId);

export const createUser = (user: any) => axios.post("auth/create_user", user);

export const deleteUser = (userId: any) =>
  axios.delete("auth/delete_user/" + userId);

export const updateUser = (userId: any, user: any) =>
  axios.put("auth/update_user/" + userId, user);

export const uploadImage = (username: string, image: File | null) =>
  axios.post("auth/image_upload");
