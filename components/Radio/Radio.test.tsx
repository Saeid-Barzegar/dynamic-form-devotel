import { fireEvent, render } from "@testing-library/react";
import Radio from "./Radio";
import { RadioPropTypes } from "./radio.types";
import { UseFormRegisterReturn } from "react-hook-form";

describe("Radio Group Component", () => {
  const mockRegister: UseFormRegisterReturn<string> = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: "testRadio",
  };
  const props: RadioPropTypes = {
    id: "radio-id",
    label: "Radio label",
    data: [
      { id: 0, value: "value1", label: "Label 1" },
      { id: 1, value: "value2", label: "Label 2" }
    ],
    register: mockRegister,
  };

  test("should render correctly", () => {
    const { container } = render(<Radio {...props} />);
    expect(container).toMatchSnapshot();
  });

  test("renders all radio options", () => {
    const { getByLabelText } = render(<Radio {...props} />);
    expect(getByLabelText("Label 1")).toBeDefined();
    expect(getByLabelText("Label 2")).toBeDefined();
  });

  test("checks a radio when clicked", () => {
    const { getByLabelText } = render(<Radio {...props} />);
    const radio = getByLabelText("Label 1") as HTMLInputElement;

    expect(radio.checked).toBe(false);
    fireEvent.click(radio);
    expect(radio.checked).toBe(true);
  });
});