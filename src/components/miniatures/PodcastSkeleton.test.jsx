import { screen, render } from "../../test-utils";
import PodcastSkeleton from "./PodcastSkeleton";

describe("<PodcastSkeleton", () => {
  test("PodcastSkeleton renders correctly", () => {
    render(<PodcastSkeleton />);
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });
});
