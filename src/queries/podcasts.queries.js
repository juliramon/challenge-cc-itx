import { useQuery } from "@tanstack/react-query";
import PodcastsService from "../services/podcasts.service";

export function useGetPodcast(podcastId, enabled = true) {
  const service = new PodcastsService();
  const query = useQuery(["podcast", podcastId], () =>
    service.getPodcastById(podcastId, { enabled: enabled })
  );
  return query;
}

export function useGetPodcasts() {
  const service = new PodcastsService();
  const query = useQuery(["podcasts"], service.getPodcasts);
  return query;
}
