import { render, screen } from "../test-utils";
import { useGetPodcast, useGetPodcasts } from "./podcasts.queries";
import Podcasts from "../pages/Podcasts";
import Podcast from "../pages/Podcast";
import Episode from "../pages/Episode";

const mockedUseGetPodcastsQuery = useGetPodcasts;
jest.mock("./podcasts.queries");

describe("<Podcasts />", () => {
  test("Renders the loading view while fetching podcasts", () => {
    mockedUseGetPodcastsQuery.mockImplementation(() => ({
      isLoading: true,
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
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    const tableElement = screen.getByRole("table");
    expect(tableElement).toBeInTheDocument();
    const episodesElement = screen.getByRole("heading", { level: 2 });
    expect(episodesElement).toBeInTheDocument();
    const podcastNameHeading = screen.getByRole("heading", { level: 3 });
    expect(podcastNameHeading).toBeInTheDocument();
  });
});

describe("<Episode />", () => {
  test("Renders the loading view while fetching the podcast", () => {
    mockedUseGetPodcastQuery.mockImplementation(() => ({
      isLoading: true,
      refetch: jest.fn(),
    }));
    render(<Episode setLoader={() => {}} />);
    const loadingElement = screen.getByLabelText(/loading/i);
    expect(loadingElement).toBeInTheDocument();
  });

  test("Renders an error message if podcast fetch goes wrong", () => {
    mockedUseGetPodcastQuery.mockImplementation(() => ({
      error: true,
      refetch: jest.fn(),
    }));
    render(<Episode setLoader={() => {}} />);
    const errorElement = screen.getByLabelText(/an error has occured/i);
    expect(errorElement).toBeInTheDocument();
  });

  test("Renders episode view if fetch is successfull", async () => {
    await mockedUseGetPodcastQuery.mockImplementation(() => ({
      isSuccess: true,
      refetch: jest.fn(),
    }));
    render(<Episode setLoader={() => {}} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    const audioElement = screen.getByLabelText("Episode audio");
    expect(audioElement).toBeInTheDocument();
  });
});
