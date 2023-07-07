import { render, screen, waitFor } from "../test-utils";
import user from "@testing-library/user-event";
import Podcasts from "./Podcasts";

describe("<Podcasts />", () => {
  test("Page renders correctly", () => {
    render(<Podcasts setLoader={() => {}} />);

    const listItemElements = screen.getByLabelText(/grid of podcasts/i);
    expect(listItemElements).toBeInTheDocument();

    const searchInputElement = screen.getByRole("textbox", {
      name: "Filter podcasts",
    });
    expect(searchInputElement).toBeInTheDocument();

    const numberPodcastsElement = screen.getByLabelText(/number of podcasts/i);
    expect(numberPodcastsElement).toBeInTheDocument();
  });

  test("Updates podcasts list on input search changes", async () => {
    user.setup();
    render(<Podcasts setLoader={() => {}} />);
    const searchInputElement = screen.getByRole("textbox", {
      name: "Filter podcasts",
    });

    await waitFor(() =>
      user.type(searchInputElement, "the joe budden podcast")
    );

    expect(searchInputElement).toHaveValue("the joe budden podcast");
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
