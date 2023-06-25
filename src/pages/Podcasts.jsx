import React from "react";
import PodcastsService from "../services/podcastsService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
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

  const { isLoading, data, status, error } = useQuery(
    ["podcasts"],
    service.getPodcasts,
    {
      staleTime: 60 * 24 * (60 * 1000), // 24 hours
      cacheTime: 60 * 24 * (60 * 1000), // 24 hours
    }
  );

  useEffect(() => {
    if (status === "success") {
      const { contents } = data;
      const { feed } = JSON.parse(contents);
      const { entry } = feed;

      setPodcasts({
        ...podcasts,
        data: feed,
        entries: entry,
      });
    }
  }, [status]);

  if (error) return "An error has occurred. Please try again later.";

  return (
    <section className="py-12">
      <div className="container">
        <div className="border-b border-slate-300 pb-4">
          <Link href={"#"} title="Podcaster">
            <h1>Podcaster</h1>
          </Link>
        </div>

        <div className="flex flex-wrap items-stretch -mx-4 mt-8">
          {isLoading
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
