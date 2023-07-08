import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  checkIfObjectIsEmpty,
  formatDateTimeToISODate,
  formatMsToISODuration,
} from "../utils/helpers";
import { useGetPodcast } from "../queries/podcasts.queries";

const Podcast = ({ setLoader }) => {
  const { id } = useParams();
  const { isLoading, data, error } = useGetPodcast(id);

  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    setLoader(false);

    if (
      !isLoading &&
      checkIfObjectIsEmpty(podcast) &&
      episodes.length === 0 &&
      data
    ) {
      const contents = JSON.parse(data.contents).results;

      setPodcast(contents[0]);
      setEpisodes(contents.slice(1));
    }
  }, [isLoading, podcast, episodes, data]);

  if (error) {
    console.error(
      "An error has occurred. Please try again later:" + error.message
    );
    return (
      <div
        role="alert"
        aria-label="An error has occured"
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      >
        An error has occured. Please try again later
      </div>
    );
  }

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
                  <picture className="block w-48 h-48">
                    <img
                      src={podcast?.artworkUrl600}
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
                  <div aria-label="Loading" className="animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-44 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-36"></div>
                  </div>
                ) : (
                  <ul className="list-none m-0 p-0">
                    <li>
                      <h3 className="font-bold text-lg">
                        {podcast?.collectionName}
                      </h3>
                    </li>
                    <li>
                      <span className="text-gray-600 italic inline-block">
                        by {podcast?.artistName}
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
            <div className="shadow-md rounded px-5 py-3">
              <div className="flex items-center">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-56 mr-3 mb-2.5"></div>
                    <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                  </div>
                ) : (
                  <div className="flex items-center text-xl">
                    <h2 className="my-0 font-bold">Episodes:</h2>
                    <span className="ml-2">{podcast?.trackCount}</span>
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
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs border-b border-gray-300">
                      <tr>
                        {["Title", "Date", "Duration"].map((el, idx) => (
                          <th key={idx} scope="col" className="px-6 py-3">
                            {el}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {episodes.map((el, idx) => {
                        return (
                          <tr
                            key={el.trackId}
                            className={`border-b ${
                              idx % 2 ? "bg-white" : "bg-gray-50"
                            }`}
                          >
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <Link
                                to={`/podcast/${id}/episode/${el.trackId}`}
                                className="text-blue-400"
                              >
                                {el?.trackName}
                              </Link>
                            </th>
                            <td className="px-6 py-4">
                              {formatDateTimeToISODate(el.releaseDate)}
                            </td>
                            <td className="px-6 py-4">
                              {formatMsToISODuration(el.trackTimeMillis)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <legend className="text-gray-500 text-xs mt-4">
                    A list of 20 episodes of the "
                    <span className="inline-block underline">
                      {podcast?.trackName}
                    </span>
                    " podcast is displayed above following the API endpoint
                    parameter limit.
                  </legend>
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
