import { render, screen } from "../test-utils";
import { useGetPodcast, useGetPodcasts } from "./podcasts.queries";
import Podcasts from "../pages/Podcasts";
import Podcast from "../pages/Podcast";

const mockedUseGetPodcastsQuery = useGetPodcasts;
jest.mock("./podcasts.queries");

describe("<Podcasts />", () => {
  test("Renders the loading view while fetching podcasts", () => {
    mockedUseGetPodcastsQuery.mockImplementation(() => ({
      isLoading: true,
      id: "10001",
    }));
    render(<Podcasts setLoader={() => {}} />);
    const loadingElement = screen.getByLabelText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("Renders an error message if podcasts fetch goes wrong", () => {
    mockedUseGetPodcastsQuery.mockImplementation(() => ({
      error: true,
    }));
    render(<Podcasts setLoader={() => {}} />);
    const errorElement = screen.getByLabelText(/an error has occured/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("Renders podcasts list if podcasts fetch is successfull", async () => {
    await mockedUseGetPodcastsQuery.mockImplementation(() => ({
      isSuccess: true,
    }));
    render(<Podcasts setLoader={() => {}} />);
    const successElement = screen.getByTestId("has-podcasts");
    expect(successElement).toBeInTheDocument();
  });
});

const mockedUseGetPodcastQuery = useGetPodcast;

describe("<Podcast />", () => {
  test("Renders the loading view while fetching the podcast", () => {
    mockedUseGetPodcastQuery.mockImplementation(() => ({
      isLoading: true,
    }));
    render(<Podcast setLoader={() => {}} />);
    const loadingElement = screen.getByLabelText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("Renders an error message if podcast fetch goes wrong", () => {
    mockedUseGetPodcastQuery.mockImplementation(() => ({
      error: true,
    }));
    render(<Podcast setLoader={() => {}} />);
    const errorElement = screen.getByLabelText(/an error has occured/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("Renders podcast view if fetch is successfull", async () => {
    await mockedUseGetPodcastQuery.mockImplementation(() => ({
      isSuccess: true,
    }));
    render(<Podcast setLoader={() => {}} />);
    const successElement = screen.getByRole("heading", { level: 3 });
    expect(successElement).toBeInTheDocument();
  });
});
