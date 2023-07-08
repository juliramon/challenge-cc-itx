import { screen, render } from "../../test-utils";
import Podcast from "./Podcast";

describe("<Podcast miniature />", () => {
  test("Podcast miniature renders correctly", () => {
    render(<Podcast />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();

    const headingElement = screen.getByRole("heading");
    expect(headingElement).toBeInTheDocument();

    const authorElement = screen.getByText(/author:/i);
    expect(authorElement).toBeInTheDocument();
  });

  test("Podcast miniature renders placeholder values if prop data is null", () => {
    render(<Podcast data={null} />);

    const avatarSkeleton = screen.getByLabelText(/avatar skeleton/i);
    expect(avatarSkeleton).toBeInTheDocument();

    const headingElement = screen.getByRole("heading", { level: 3 });
    expect(headingElement.innerHTML).toBe("-");

    const authorElement = screen.getByLabelText(/author name/i);
    expect(authorElement.innerHTML).toBe("-");
  });

  test("Podcast miniature renders correctly if prop data is not empty", () => {
    const podcast = {
      title: {
        label: "Podcast title",
      },
      "im:image": [
        {
          0: {
            label: "https://placehold.co/200x200",
          },
          1: {
            label: "https://placehold.co/200x200",
          },
          2: {
            label: "https://placehold.co/200x200",
          },
        },
      ],
      "im:artist": {
        label: "Podcast artist",
      },
      id: {
        attributes: {
          "im:id": "000001",
        },
      },
    };

    render(<Podcast data={podcast} />);

    const avatarElement = screen.getByLabelText(/avatar/i);
    expect(avatarElement).toBeInTheDocument();

    const headingElement = screen.getByRole("heading", { level: 3 });
    expect(headingElement.innerHTML).toBe(podcast.title.label);

    const authorElement = screen.getByLabelText(/author name/i);
    expect(authorElement.innerHTML).toBe(podcast["im:artist"].label);
  });
});
