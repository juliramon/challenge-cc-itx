import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("<Avatar />", () => {
  test("Avatar renders correctly", () => {
    render(<Loader />);
    const element = screen.getByText(/loading.../i);
    expect(element).toBeInTheDocument();
  });
});
