import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button Component unit tests", () => {
  test("should render correctly with correct label", () => {
    const { container, getByText } = render(<Button>Button</Button>);
    expect(container).toMatchSnapshot();
    expect(getByText("Button")).toBeDefined();
  });

  test("should render disabled button correctly", () => {
    const { container } = render(<Button disabled>Button</Button>);
    expect(container).toMatchSnapshot();
  });
})