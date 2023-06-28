import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PodcastsService from "../services/podcastsService";
import PodcastSkeleton from "../components/miniatures/PodcastSkeleton";
import Podcast from "../components/miniatures/Podcast";

const Podcasts = ({ setLoader }) => {
  const service = new PodcastsService();

  const [podcasts, setPodcasts] = useState({
    data: [],
    entries: [],
    filteredPodcasts: [],
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { isLoading, data, error } = useQuery(
    ["podcasts"],
    service.getPodcasts,
    {
      staleTime: 60 * 24 * (60 * 1000), // 24 hours
      cacheTime: 60 * 24 * (60 * 1000), // 24 hours
    }
  );

  useEffect(() => {
    setLoader(false);

    if (!isLoading && podcasts.entries.length === 0) {
      const { contents } = data;
      const { feed } = JSON.parse(contents);
      const { entry } = feed;

      setPodcasts({
        ...podcasts,
        data: feed,
        entries: entry,
        filteredPodcasts: entry,
        success: true,
      });
    }
  }, [isLoading, podcasts]);

  useEffect(() => {
    const filteredPodcasts = podcasts.entries.filter(
      (podcast) =>
        podcast?.title?.label.toLowerCase().includes(searchQuery) ||
        podcast?.artist?.label.toLowerCase().includes(searchQuery)
    );

    setPodcasts({ ...podcasts, filteredPodcasts: filteredPodcasts });
  }, [searchQuery]);

  if (error)
    console.error(
      "An error has occurred. Please try again later:" + error.message
    );

  return (
    <section className="pb-12">
      <div className="container">
        <div className="flex items-center justify-end mt-8">
          <span className="bg-blue-600 inline-flex items-center text-white rounded-full font-semibold px-2.5 py-0.5 mr-2">
            {podcasts.filteredPodcasts.length}
          </span>

          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <input
                type="text"
                name="searchQuery"
                id="searchQuery"
                placeholder="Filter podcasts..."
                onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
                value={searchQuery}
              />
            </fieldset>
          </form>
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
            : podcasts.filteredPodcasts.map((el, idx) => (
                <article
                  className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8"
                  key={el?.["id"]?.["attributes"]?.["im:id"]}
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
