import { render, screen } from "@testing-library/react";
import SquareAvatarSkeleton from "./SquareAvatarSkeleton";

describe("<SquareAvatarSkeleton />", () => {
  test("Square avatar skeleton renders correctly", () => {
    render(<SquareAvatarSkeleton />);
    const ariaLabel = screen.getByLabelText(/square avatar skeleton/i);
    expect(ariaLabel).toBeInTheDocument();
  });
});
