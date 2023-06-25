import React from "react";
import PodcastsService from "../services/podcastsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PodcastSkeleton from "../components/miniatures/PodcastSkeleton";
import Podcast from "../components/miniatures/Podcast";

const Podcasts = () => {
  const service = new PodcastsService();
  const [podcasts, setPodcasts] = useState({
    message: "",
    isFetching: false,
    hasData: false,
    data: [],
    entries: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      setPodcasts({ ...podcasts, isFetching: true });

      const { contents, status } = await service.getPodcasts();
      console.log(contents);
      const { feed } = JSON.parse(contents);
      const { entry } = feed;

      if (status.http_code === 200 && feed) {
        setPodcasts({
          ...podcasts,
          isFetching: false,
          hasData: true,
          data: feed,
          entries: entry,
        });
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-12">
      <div className="container">
        <div className="border-b border-slate-300 pb-4">
          <Link href={"#"} title="Podcaster">
            <h1>Podcaster</h1>
          </Link>
        </div>

        <div className="flex flex-wrap items-stretch -mx-4 mt-8">
          {podcasts.isFetching && podcasts.entries.length === 0
            ? [...Array(8).keys()].map((el, idx) => (
                <article
                  className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8"
                  key={idx}
                >
                  <PodcastSkeleton />
                </article>
              ))
            : podcasts.entries.map((el, idx) => (
                <article
                  className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8"
                  key={idx}
                >
                  <Podcast data={el} />
                </article>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Podcasts;
