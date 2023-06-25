import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import { Routes, Route } from "react-router-dom";
import Podcasts from "./pages/Podcasts";

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

  return (
    <main className="app">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route>
            <Route index element={<Podcasts />} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </main>
  );
};

export default App;
