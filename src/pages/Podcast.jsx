import React, { useEffect, useState } from "react";
import PodcastsService from "../services/podcastsService";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import {
  convertDateTimeToDate,
  convertMillisecondsToMinutesAndSeconds,
} from "../utils/helpers";

const Podcast = () => {
  const service = new PodcastsService();
  const { id } = useParams();

  const [podcast, setPodcast] = useState({
    data: [],
    episodes: [],
  });

  const { isLoading, data, status, error } = useQuery(
    ["podcast", id],
    () => service.getPodcastById(id),
    {
      staleTime: 60 * 24 * (60 * 1000), // 24 hours
      cacheTime: 60 * 24 * (60 * 1000), // 24 hours
    }
  );

  useEffect(() => {
    if (!isLoading && podcast.data.length === 0) {
      const contents = JSON.parse(data.contents).results;

      setPodcast({
        ...podcast,
        data: contents.slice(0, 1)[0],
        episodes: contents.slice(1),
      });
    }
  }, [isLoading, podcast]);

  if (error)
    console.error(
      "An error has occurred. Please try again later:" + error.message
    );

  return (
    <section className="mt-8">
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
                  <picture className="block w-48 h-48">
                    <img
                      src={podcast.data.artworkUrl600}
                      alt=""
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      loading="eager"
                      fetchpriority="high"
                    />
                  </picture>
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
                      <h3 className="font-bold text-lg">
                        {podcast.data.collectionName}
                      </h3>
                    </li>
                    <li>
                      <span className="text-gray-600 italic">
                        by {podcast.data.artistName}
                      </span>
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
                  <div className="">
                    <h4 className="font-bold">Description</h4>
                    <div className="text-block">
                      {podcast.data?.description
                        ? podcast.data.description
                        : "-"}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>
          <article className="w-full md:w-9/12 px-4">
            <div className="shadow-md rounded px-5 py-3">
              <div className="flex items-center">
                {isLoading ? (
                  <>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-56 animate-pulse mr-3"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-10 animate-pulse"></div>
                  </>
                ) : (
                  <div className="flex items-center text-xl">
                    <h2 className="my-0 font-bold">Episodes:</h2>
                    <span className="ml-2">{podcast.data.trackCount}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="shadow-md rounded p-5 mt-4">
              {isLoading ? (
                <div
                  role="status"
                  className="w-full -my-4 divide-y divide-gray-200 rounded animate-pulse dark:divide-gray-700 dark:border-gray-700"
                >
                  {[...Array(8).keys()].map((el, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-4"
                    >
                      <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div class="relative overflow-x-auto">
                  <table class="w-full text-sm text-left text-gray-500 0">
                    <thead class="text-xs border-b border-gray-300">
                      <tr>
                        {["Title", "Date", "Duration"].map((el, idx) => (
                          <th key={idx} scope="col" class="px-6 py-3">
                            {el}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {podcast.episodes.map((el, idx) => {
                        return (
                          <tr
                            key={el.trackId}
                            class={`border-b ${
                              idx % 2 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link to={"/"} title={el.trackName}>
                                {el.trackName}
                              </Link>
                            </th>
                            <td class="px-6 py-4">
                              {convertDateTimeToDate(el.releaseDate)}
                            </td>
                            <td class="px-6 py-4">
                              {convertMillisecondsToMinutesAndSeconds(
                                el.trackTimeMillis
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Podcast;
