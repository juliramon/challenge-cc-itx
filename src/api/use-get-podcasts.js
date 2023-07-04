import { useQuery } from "@tanstack/react-query";
import PodcastsService from "./client";

const useGetPodcasts = () => {
  const service = new PodcastsService();
  const query = useQuery(["podcasts"], service.getPodcasts);
  return query;
};

export default useGetPodcasts;
