import { screen, render } from "../../test-utils";
import Avatar from "./Avatar";

describe("<Avatar />", () => {
  test("Avatar renders correctly", () => {
    render(<Avatar imgSrc={"placeholder.jpg"} imgAlt={"Placeholder alt"} />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });
});
