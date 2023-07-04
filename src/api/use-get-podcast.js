import { useQuery } from "@tanstack/react-query";
import PodcastsService from "./client";

const useGetPodcast = (podcastId, enabled = true) => {
  const service = new PodcastsService();
  const query = useQuery(["podcast", podcastId], () =>
    service.getPodcastById(podcastId, { enabled: enabled })
  );
  return query;
};

export default useGetPodcast;
