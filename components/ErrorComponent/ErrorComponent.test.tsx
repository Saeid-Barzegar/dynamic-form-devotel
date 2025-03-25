import { render } from '@testing-library/react';
import ErrorComponent from './ErrorComponent';


describe('ErrorComponent', () => {
  test('renders the error message with default error message', () => {
    const { getByText } = render(<ErrorComponent />);
    expect(getByText("Please contact support team.")).toBeDefined();
  });
  test('renders the error message with custom error message', () => {
    const { getByText } = render(<ErrorComponent message="This is an error" />);
    expect(getByText("This is an error")).toBeDefined();
  });
})