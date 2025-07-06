import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addPrompt,
  deletePrompt,
  getAllPrompt,
  getCategoryPrompt,
  updatePrompt,
} from "../api/promptApi";

export const useAllPrompt = ({ page = 1, limit }) => {
  return useQuery({
    queryKey: ["prompts", page, limit],
    queryFn: () => getAllPrompt({ page, limit }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useCategoryPrompt = ({ category, page = 1, limit }) => {
  return useQuery({
    queryKey: ["promptsByCategory", category, page, limit],
    queryFn: () => getCategoryPrompt({ category, page, limit }),
    enabled: !!category,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};

export const useAddPrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addPrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export const useUpdatePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};

export const useDeletePrompt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePrompt,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prompts"] });
    },
  });
};
