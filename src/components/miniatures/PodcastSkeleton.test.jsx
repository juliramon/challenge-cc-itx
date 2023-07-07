import { screen, render } from "@testing-library/react";
import PodcastSkeleton from "./PodcastSkeleton";

describe("<PodcastSkeleton", () => {
  test("PodcastSkeleton renders correctly", () => {
    render(<PodcastSkeleton />);
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });
});
