import { render, screen } from "@testing-library/react";
import App from "./App";
import { unmountComponentAtNode } from "react-dom";

describe("<App />", () => {
  test("Renders the project root", () => {
    const div = document.createElement("div");
    render(<App />);
    unmountComponentAtNode(div);
  });
});
