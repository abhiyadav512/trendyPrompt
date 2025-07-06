import axiosInstance from "../lib/axios";

export const getAllPrompt = async ({ page = 1, limit }) => {
  const response = await axiosInstance.get(
    `/api/prompt/all?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getCategoryPrompt = async ({ category, page = 1, limit }) => {
  if (!category) throw new Error("Category is required");

  const response = await axiosInstance.get(
    `/api/prompt/${category}?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const addPrompt = async (formData) => {
  const response = await axiosInstance.post("/api/prompt/add", formData);
  return response.data;
};

export const updatePrompt = async ({ id, formData }) => {
  const response = await axiosInstance.patch(`/api/prompt/${id}`, formData);
  return response.data;
};

export const deletePrompt = async (id) => {
  const response = await axiosInstance.delete(`/api/prompt/${id}`);
  return response.data;
};
