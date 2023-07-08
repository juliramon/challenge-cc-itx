import Layout from "./Layout";
import { render, screen } from "../../test-utils";

describe("<Layout />", () => {
  test("Layout renders correctly", () => {
    render(<Layout />);

    const headerElement = screen.getByRole("header");
    expect(headerElement).toBeInTheDocument();

    const alertElement = screen.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link", { name: "Podcaster" });
    expect(linkElement).toHaveAttribute("href", "/");

    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toHaveTextContent(/podcaster/i);
  });
});
