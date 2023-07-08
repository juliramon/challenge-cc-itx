import { useEffect, useState } from "react";
import PodcastSkeleton from "../components/miniatures/PodcastSkeleton";
import Podcast from "../components/miniatures/Podcast";
import { useGetPodcasts } from "../queries/podcasts.queries";

const Podcasts = ({ setLoader }) => {
  const { isLoading, data, error, isSuccess } = useGetPodcasts();

  const [searchQuery, setSearchQuery] = useState("");
  const [podcasts, setPodcasts] = useState({
    entries: [],
    filteredPodcasts: [],
  });

  useEffect(() => {
    setLoader(false);

    if (!isLoading && podcasts?.entries?.length === 0) {
      setPodcasts({
        ...podcasts,
        entries: data?.feed?.entry,
        filteredPodcasts: data?.feed?.entry,
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
    <section className="pb-12">
      <div className="container">
        <div className="flex items-center justify-end mt-8">
          <span
            aria-label="Number of podcasts"
            className="bg-blue-600 inline-flex items-center text-white rounded-full font-semibold px-2.5 py-0.5 mr-2"
          >
            {podcasts?.filteredPodcasts?.length}
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
                aria-label="Filter podcasts"
              />
            </fieldset>
          </form>
        </div>

        <div
          id="podcastsGrid"
          data-testid={isSuccess ? "has-podcasts" : "no-podcasts"}
          aria-label="Grid of podcasts"
          className="flex flex-wrap items-stretch -mx-4 mt-8"
        >
          {isLoading ? (
            <div
              aria-label="loading"
              className="flex flex-wrap items-stretch px-4 -mx-4"
            >
              {[...Array(8).keys()].map((el, idx) => (
                <article
                  className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8"
                  key={idx}
                >
                  <PodcastSkeleton />
                </article>
              ))}
            </div>
          ) : isSuccess ? (
            podcasts?.filteredPodcasts?.map((el, idx) => (
              <article
                aria-label="Podcast"
                className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-8"
                key={el?.["id"]?.["attributes"]?.["im:id"]}
              >
                <Podcast data={el} />
              </article>
            ))
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Podcasts;
