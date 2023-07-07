import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Podcasts from "./Podcasts";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queries/queryClient";

describe("<Podcasts />", () => {
  test("Page renders correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Podcasts setLoader={() => {}} />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const listItemElements = screen.getByLabelText(/grid of podcasts/i);
    expect(listItemElements).toBeInTheDocument();

    const searchElement = screen.getByRole("textbox", {
      name: "Filter podcasts",
    });
    expect(searchElement).toBeInTheDocument();

    const numberPodcastsElement = screen.getByLabelText(/number of podcasts/i);
    expect(numberPodcastsElement).toBeInTheDocument();
  });

  //   test("Renders a list of podcasts", () => {
  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <BrowserRouter>
  //           <Podcasts setLoader{() => {}} />
  //         </BrowserRouter>
  //       </QueryClientProvider>
  //     );

  //     const listPodcastElements = screen.getAllByRole("article");
  //     expect(listPodcastElements).toHaveLength(podcasts.length);
  //   });
});
