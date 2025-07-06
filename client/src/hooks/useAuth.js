import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../api/authApi";

export const useLogin = ({ onError, onSuccess } = {}) => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess,
    onError,
  });
};
export const useRegister = ({ onError, onSuccess } = {}) => {
  return useMutation({
    mutationFn: registerApi,
    onSuccess,
    onError,
  });
};
