import { UseFormRegisterReturn } from "react-hook-form";

export const mockRegister: UseFormRegisterReturn<string> = {
  onChange: jest.fn(),
  onBlur: jest.fn(),
  ref: jest.fn(),
  name: "testRadio",
};