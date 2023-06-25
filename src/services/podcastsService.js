import axios from "axios";

class PodcastsService {
  constructor() {
    this.service = axios.create({
      baseURL: `https://api.allorigins.win/get?url=${encodeURIComponent(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      )}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  getPodcasts = () => this.service.get().then((res) => res.data);
}

export default PodcastsService;
