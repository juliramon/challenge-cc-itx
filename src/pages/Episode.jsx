import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PodcastsService from "../services/podcastsService";

const Episode = ({ setLoader }) => {
  const service = new PodcastsService();
  const queryClient = new useQueryClient();

  const { id } = useParams();
  const { episodeId } = useParams();

  const [episode, setEpisode] = useState({});
  const [podcast, setPodcast] = useState({});

  let { isFetched, isLoading, data, error, refetch } = useQuery(
    ["podcast", id],
    () => service.getPodcastById(id),
    {
      enabled: false,
      staleTime: 60 * 24 * (60 * 1000), // 24 hours
      cacheTime: 60 * 24 * (60 * 1000), // 24 hours
    }
  );

  console.log(isFetched);

  useEffect(() => {
    setLoader(false);

    if (
      Object.keys(episode).length === 0 &&
      Object.keys(podcast).length === 0
    ) {
      if (!isFetched) {
        console.log("test");
        data = queryClient.getQueryData({
          queryKey: ["podcast", id],
        });
      }

      console.log(isFetched);

      if (!data) {
        console.log("in");
        console.log(data);
        refetch();
        return;
      }

      const contents = JSON.parse(data?.contents).results;
      const episodeData = contents
        .slice(1)
        .find((el) => el.trackId === parseInt(episodeId));

      setPodcast(contents[0]);
      setEpisode(episodeData);
    }
  }, [episode, podcast, data]);

  if (error)
    console.error(
      "An error has occurred. Please try again later:" + error.message
    );

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <aside className="w-full md:w-3/12 px-4">
            <div className="shadow-md rounded p-5">
              {isLoading ? (
                <div className="flex items-center justify-center mx-auto w-48 h-48 mb-4 bg-gray-300 rounded overflow-hidden dark:bg-gray-700 animate-pulse">
                  <svg
                    className="w-12 h-12 text-gray-200 dark:text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 640 512"
                  >
                    <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center justify-center mx-auto w-48 h-48 mb-4 bg-gray-300 rounded overflow-hidden">
                  <Link to={`/podcast/${id}`} title={podcast.collectionName}>
                    <picture className="block w-48 h-48">
                      <img
                        src={podcast.artworkUrl600}
                        alt={podcast.collectionName}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchpriority="high"
                      />
                    </picture>
                  </Link>
                </div>
              )}
              <div className="border-t border-slate-300 py-4">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                  </div>
                ) : (
                  <ul className="list-none m-0 p-0">
                    <li>
                      <Link
                        to={`/podcast/${id}`}
                        title={podcast.collectionName}
                      >
                        <h3 className="font-bold text-lg text-black hover:text-blue-400 transition-all duration-300 ease-in-out">
                          {podcast.collectionName}
                        </h3>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/podcast/${id}`}
                        className="text-gray-600 italic inline-block"
                      >
                        by {podcast.artistName}
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
              <div className="border-t border-slate-300 pt-4">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                  </div>
                ) : (
                  <>
                    <h4 className="font-bold">Description</h4>
                    <div className="text-block">
                      {podcast?.description ? podcast.description : "-"}
                    </div>
                  </>
                )}
              </div>
            </div>
          </aside>
          <article className="w-full md:w-9/12 px-4">
            <div className="shadow-md rounded p-5">
              {isLoading ? (
                <div role="status" class="space-y-2.5 animate-pulse max-w-lg">
                  {[...Array(5).keys()].map((el, idx) => (
                    <div class="flex items-center w-full space-x-2">
                      <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                    </div>
                  ))}

                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  <h2>{episode.trackName}</h2>
                  <div
                    className="text-block mt-3"
                    dangerouslySetInnerHTML={{ __html: episode.description }}
                  ></div>
                  <div className="mt-6 border-t border-slate-200 pt-6">
                    <audio
                      src={episode.episodeUrl}
                      controls
                      className="w-full sm:w-1/2"
                    />
                  </div>
                </>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Episode;