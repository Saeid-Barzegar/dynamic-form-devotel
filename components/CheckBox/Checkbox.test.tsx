import { render, fireEvent } from "@testing-library/react";
import CheckBoxGroup from "./Checkbox";
import { CheckBoxGroupProps } from "./checkbox.types";
import { UseFormRegisterReturn } from "react-hook-form";

describe("CheckBoxGroup Component", () => {
  const mockRegister: UseFormRegisterReturn<string> = {
    onChange: jest.fn(),
    onBlur: jest.fn(),
    ref: jest.fn(),
    name: "testCheckbox",
  };

  const defaultProps: CheckBoxGroupProps = {
    label: "Select options",
    options: [
      { id: 1, label: "Option 1", value: "option1" },
      { id: 2, label: "Option 2", value: "option2" },
    ],
    register: mockRegister,
    error: "",
  };

  test("renders the label", () => {
    const { getByText } = render(<CheckBoxGroup {...defaultProps} />);
    expect(getByText("Select options")).toBeDefined();
  });

  test("renders all checkboxes", () => {
    const { getByLabelText } = render(<CheckBoxGroup {...defaultProps} />);
    expect(getByLabelText("Option 1")).toBeDefined();
    expect(getByLabelText("Option 2")).toBeDefined();
  });

  test("checks a checkbox when clicked", () => {
    const { getByLabelText } = render(<CheckBoxGroup {...defaultProps} />);
    const checkbox = getByLabelText("Option 1") as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

  test("displays an error message when error prop is provided", () => {
    const { getByText } = render(<CheckBoxGroup {...defaultProps} error="This is an error" />);
    expect(getByText("This is an error")).toBeDefined();
  });
});
