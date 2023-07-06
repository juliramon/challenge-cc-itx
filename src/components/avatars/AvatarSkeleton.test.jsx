import { render, screen } from "@testing-library/react";
import AvatarSkeleton from "./AvatarSkeleton";

describe("<AvatarSkeleton />", () => {
  test("Avatar skeleton renders correctly", () => {
    render(<AvatarSkeleton />);
    const ariaLabel = screen.getByLabelText(/avatar skeleton/i);
    expect(ariaLabel).toBeInTheDocument();
  });
});
