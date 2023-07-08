import { render, screen } from "../../test-utils";
import SquareAvatarSkeleton from "./SquareAvatarSkeleton";

describe("<SquareAvatarSkeleton />", () => {
  test("Square avatar skeleton renders correctly", () => {
    render(<SquareAvatarSkeleton />);
    const ariaLabel = screen.getByLabelText(/square avatar skeleton/i);
    expect(ariaLabel).toBeInTheDocument();
  });
});
