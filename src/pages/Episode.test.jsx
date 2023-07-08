import { render, screen } from "../test-utils";
import Episode from "./Episode";

describe("<Episode />", () => {
  test("Page renders correctly", () => {
    render(<Episode setLoader={() => {}} />);

    const articleElemenet = screen.getByRole("article");
    expect(articleElemenet).toBeInTheDocument();
    const asideElement = screen.getByRole("complementary");
    expect(asideElement).toBeInTheDocument();
  });
});
