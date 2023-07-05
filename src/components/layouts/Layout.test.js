import { render, screen } from "@testing-library/react";
import App from "../../App";

describe("<Layout />", () => {
  test("Should display a header which links to the root of the SPA", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toHaveTextContent(/Podcaster/);
    expect(screen.getByRole("heading").closest("a")).toHaveAttribute(
      "href",
      "/"
    );
    expect(
      screen.getByRole("textbox", { name: "Filter podcasts" })
    ).toBeVisible();
    expect(screen.getByLabelText("Grid of podcasts")).toBeInTheDocument();
  });
});
