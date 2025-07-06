import axiosInstance from "../lib/axios";

export const loginApi = async (data) => {
  const response = await axiosInstance.post("/api/user/auth/signin", data);
  return response.data;
};

export const registerApi = async (data) => {
  const response = await axiosInstance.post("/api/user/auth/signup", data);
  return response.data;
};
