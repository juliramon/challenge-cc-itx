import { render, screen } from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe("<Avatar />", () => {
  test("Avatar renders correctly", () => {
    render(<LoadingSpinner />);
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });
});
