import { Routes, Route } from "react-router-dom";
import Podcasts from "./pages/Podcasts";

const App = () => {
  return (
    <main className="app">
      <Routes>
        <Route>
          <Route index element={<Podcasts />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
