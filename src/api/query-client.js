import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 24 * (60 * 1000), // 24 hours
      cacheTime: 60 * 24 * (60 * 1000), // 24 hours
    },
  },
});
