import axios from "axios";

class PodcastsService {
  constructor() {
    this.service = axios.create({
      baseURL: "https://api.allorigins.win",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getPodcasts = () => {
    const endpoint =
      "/get?url=" +
      encodeURIComponent(
        `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`
      );
    return this.service.get(endpoint).then((res) => res.data);
  };

  getPodcastById = (id) => {
    const endpoint =
      "/get?url=" +
      encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
      );
    return this.service.get(endpoint).then((res) => res.data);
  };
}
export default PodcastsService;
