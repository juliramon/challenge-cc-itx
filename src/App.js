import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Routes, Route } from "react-router-dom";
import Podcasts from "./pages/Podcasts";
import Podcast from "./pages/Podcast";
import Layout from "./components/layouts/Layout";
import Episode from "./pages/Episode";
import Error404 from "./pages/404";
import { useState } from "react";

const App = () => {
  const cacheTime = 60 * 24 * (60 * 1000); // 24 hours

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        cacheTime,
      },
    },
  });

  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });

  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  return (
    <main className="app">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={<Layout isLoaderVisible={isLoaderVisible} />}
          >
            <Route
              index
              element={<Podcasts setLoader={setIsLoaderVisible} />}
            />
            <Route
              path="/podcast/:id"
              element={<Podcast setLoader={setIsLoaderVisible} />}
            />
            <Route
              path="/podcast/:id/episode/:episodeId"
              element={<Episode setLoader={setIsLoaderVisible} />}
            />
            <Route path="*" element={<Error404 />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </main>
  );
};

export default App;
