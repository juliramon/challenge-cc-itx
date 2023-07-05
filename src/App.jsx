import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { queryClient } from "./queries/queryClient";
import Podcasts from "./pages/Podcasts";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";
import Error404 from "./pages/404";
import Layout from "./components/layouts/Layout";

const App = () => {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
  });

  persistQueryClient({
    queryClient,
    persister: localStoragePersister,
  });

  const [isLoaderVisible, setIsLoaderVisible] = useState(true);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout isLoaderVisible={isLoaderVisible} />,
      errorElement: <Error404 />,
      children: [
        {
          index: true,
          element: <Podcasts setLoader={setIsLoaderVisible} />,
        },
        {
          path: "/podcast/:id",
          element: <Podcast setLoader={setIsLoaderVisible} />,
        },
        {
          path: "/podcast/:id/episode/:episodeId",
          element: <Episode setLoader={setIsLoaderVisible} />,
        },
      ],
    },
  ]);

  return (
    <main className="app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </main>
  );
};

export default App;
