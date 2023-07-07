import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { render, screen } from "@testing-library/react";

describe("<Layout />", () => {
  test("Layout renders correctly", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );

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
