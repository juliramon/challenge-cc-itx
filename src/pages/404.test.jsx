import { render, screen } from "@testing-library/react";
import Error404 from "./404";

describe("<404 />", () => {
  test("Page renders correctly", () => {
    render(<Error404 />);

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();

    const headingTextElement = screen.getByText(/page not found/i);
    expect(headingTextElement).toBeInTheDocument();
  });
});
