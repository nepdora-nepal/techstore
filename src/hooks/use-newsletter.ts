import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newsletterApi } from "@/services/api/newsletter";
import {
  CreateNewsletterRequest,
  CreateNewsletterResponse,
} from "@/types/newsletter";
import { ApiError } from "@/utils/api-error";

// Query Keys
export const newsletterKeys = {
  all: ["newsletter"] as const,
  lists: () => [...newsletterKeys.all, "list"] as const,
  list: (page: number, pageSize: number, search: string) =>
    [...newsletterKeys.lists(), { page, pageSize, search }] as const,
};

// Get all newsletter subscriptions
export const useNewsletters = (page = 1, pageSize = 10, search = "") => {
  return useQuery({
    queryKey: newsletterKeys.list(page, pageSize, search),
    queryFn: () => newsletterApi.getNewsletters(page, pageSize, search),
  });
};

// Create newsletter subscription
export const useCreateNewsletter = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateNewsletterResponse,
    ApiError,
    CreateNewsletterRequest
  >({
    mutationFn: (data) => newsletterApi.createNewsletter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["newsletter", "list"] });
    },
  });
};
