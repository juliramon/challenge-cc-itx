import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("<Avatar />", () => {
  test("Loader renders correctly", () => {
    render(<Loader isLoaderVisible={false} />);
    const element = screen.getByRole("alert");
    expect(element).toBeInTheDocument();
  });

  test("Loader is hidden when loading prop equals false", () => {
    render(<Loader isLoaderVisible={false} />);
    const element = screen.getByRole("alert");
    expect(element).toHaveClass("hidden");
  });

  test("Loader displays when loading prop equals true", () => {
    render(<Loader isLoaderVisible={true} />);
    const element = screen.getByRole("alert");
    expect(element).toHaveClass("block");
  });
});
