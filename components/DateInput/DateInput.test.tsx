import { render, fireEvent } from "@testing-library/react";
import DateInput from "./DateInput";
import { DateInputPropTypes } from "./dateInput.types";
import { format } from "date-fns";

describe("DateInput Component", () => {
  const mockOnSelect = jest.fn();

  const defaultProps: DateInputPropTypes = {
    id: "date-input",
    label: "Select Date",
    date: new Date(2024, 0, 1), // Jan 1, 2024
    onSelect: mockOnSelect,
    error: "",
    required: true,
    className: "",
  };

  test("renders the label", () => {
    const { getByLabelText } = render(<DateInput {...defaultProps} />);
    expect(getByLabelText("Select Date")).toBeDefined();
  });

  test("renders the date input with the correct value", () => {
    const { getByLabelText } = render(<DateInput {...defaultProps} />);
    const input = getByLabelText("Select Date") as HTMLInputElement;
    expect(input.value).toBe(format(defaultProps.date, "yyyy / MM / dd"));
  });

  test("calls onSelect when a date is selected", () => {
    const { getByLabelText } = render(<DateInput {...defaultProps} />);
    const input = getByLabelText("Select Date") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "2024 / 02 / 15" } });
    expect(mockOnSelect).toHaveBeenCalled();
  });

  test("displays an error message when error prop is provided", () => {
    const { getByText } = render(<DateInput {...defaultProps} error="This is an error" />);
    expect(getByText("This is an error")).toBeDefined();
  });
});
