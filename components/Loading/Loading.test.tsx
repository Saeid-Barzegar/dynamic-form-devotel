import { render } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  test("renders the loading spinner when isLoading is true", () => {
    const { container } = render(<Loading isLoading={true} />);
    expect(container.querySelector("svg")).toBeDefined();
  });

  test("does not render the loading spinner when isLoading is false", () => {
    const { container } = render(<Loading isLoading={false} />);
    expect(container.querySelector("svg")).toBeNull();
  });
});
