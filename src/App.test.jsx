import { render } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import App from "./App";

describe("<App />", () => {
  test("Renders the project root", () => {
    render(<App />);
    const div = document.createElement("div");
    unmountComponentAtNode(div);
  });
});
