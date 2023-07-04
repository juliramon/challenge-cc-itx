import axios from "axios";

class PodcastsService {
  constructor() {
    this.service = axios.create({
      baseURL: "https://api.allorigins.win/get?url=",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getPodcasts = () => {
    return this.service
      .get(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )
      .then((res) => res.data);
  };

  getPodcastById = (id) => {
    const baseURL = "https://api.allorigins.win/get?url=";
    return this.service
      .get(
        baseURL +
          encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`
          )
      )
      .then((res) => res.data);
  };
}
export default PodcastsService;
