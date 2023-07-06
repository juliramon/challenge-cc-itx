import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";

describe("<Avatar />", () => {
  test("Avatar renders correctly", () => {
    render(<Avatar />);
    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
  });
});
