import { render } from "@testing-library/react";
import SelectInput from "./Select";
import { SelectInputPropTypes } from "./selectInput.types";
import { mockRegister } from "@/mock/testMock";

describe("SelectInput", () => {
  const props: SelectInputPropTypes = {
    id: "example-id",
    label: "Example Label",
    options: [
      { id: 0, value: "value1", label: "Option 1" },
      { id: 1, value: "value2", label: "Option 2" }
    ],
    register: mockRegister,
    error: "",
  };

  test("should render correctly", () => {
    const { container } = render(<SelectInput {...props} />);
    expect(container).toMatchSnapshot();
  });

  test("renders select input options", () => {
    const { getByText } = render(<SelectInput {...props} />);
    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });
});