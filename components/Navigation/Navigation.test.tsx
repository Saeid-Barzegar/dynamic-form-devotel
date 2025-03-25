import Navigation from "./Navigation";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Navigation Component", () => {
  test("renders the navigation", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { getByRole } = render(<Navigation title="Smart Insurance" />);
    const navigation = getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  });
  test("renders the navigation with default title", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    const { getByTestId } = render(<Navigation />);
    const navTitle = getByTestId("Navigation-title");
    expect(navTitle).toHaveTextContent("");
  });
});