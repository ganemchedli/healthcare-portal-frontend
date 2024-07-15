import axios from "../config/axios";

export const listUsers = () => axios.get("auth/get_all_users");

export const getUserByEmail = () => axios.get("auth/me");

export const getUser = async (userId: any) =>
  axios.get("auth/get_user/" + userId);

export const createUser = (user: any) => axios.post("auth/create_user", user);

export const deleteUser = (userId: any) =>
  axios.delete("auth/delete_user/" + userId);

export const updateUser = (id: any, updatedFields: any) =>
  axios.put("auth/update_user/" + id, updatedFields);

export const updateUserImage = (id: any, formData: FormData) =>
  axios.put("auth/update_image/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
