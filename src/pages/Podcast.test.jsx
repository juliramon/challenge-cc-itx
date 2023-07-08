import { render, screen } from "../test-utils";
import Podcast from "./Podcast";

describe("<Podcast />", () => {
  test("Page renders correctly", () => {
    render(<Podcast setLoader={() => {}} />);

    const articleElemenet = screen.getByRole("article");
    expect(articleElemenet).toBeInTheDocument();
    const asideElement = screen.getByRole("complementary");
    expect(asideElement).toBeInTheDocument();
  });
});
