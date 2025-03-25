import { render, fireEvent } from "@testing-library/react";
import MultiSelect from "./MultiSelect";
import { MultiSelectPropType } from "./multiselect.types";

describe("MultiSelect Component", () => {
  const mockSetSelectedItems = jest.fn();

  const defaultProps: MultiSelectPropType = {
    label: "Select Items",
    options: ["Option 1", "Option 2", "Option 3"],
    selectedItems: ["Option 1"],
    setSelectedItems: mockSetSelectedItems,
    className: "",
  };

  test("renders label correctly", () => {
    const { getByText } = render(<MultiSelect {...defaultProps} />);
    expect(getByText("Select Items")).toBeDefined();
  });

  test("toggles dropdown menu when clicked", () => {
    const { getByText, queryByText } = render(<MultiSelect {...defaultProps} />);
    const mainView = getByText("Select Items");

    expect(queryByText("Option 2")).not.toBeInTheDocument();

    fireEvent.click(mainView);
    expect(getByText("Option 2")).toBeInTheDocument();

    fireEvent.click(mainView);
    expect(queryByText("Option 2")).toBeNull();

    fireEvent.click(mainView);
    fireEvent.click(getByText("Option 1"));
    expect(getByText("Option 1")).toBeInTheDocument();
  });

  test("calls setSelectedItems when an option is selected", () => {
    const { getByText, getByLabelText } = render(<MultiSelect {...defaultProps} />);
    fireEvent.click(getByText("Select Items"));

    const optionCheckbox = getByLabelText("Option 2");
    fireEvent.click(optionCheckbox);

    expect(mockSetSelectedItems).toHaveBeenCalledWith(["Option 1", "Option 2"]);
  });

  test("displays checked state for selected options", () => {
    const { getByText, getByLabelText } = render(<MultiSelect {...defaultProps} />);
    fireEvent.click(getByText("Select Items"));

    const checkedOption = getByLabelText("Option 1") as HTMLInputElement;
    expect(checkedOption.checked).toBe(true);

    const uncheckedOption = getByLabelText("Option 2") as HTMLInputElement;
    expect(uncheckedOption.checked).toBe(false);
  });
});
