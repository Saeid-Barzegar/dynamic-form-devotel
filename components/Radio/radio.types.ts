import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export type DataItemType = {
  id: number;
  label: string;
  value: string;
};

export interface RadioPropTypes extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  data: DataItemType[];
  register: UseFormRegisterReturn<string>;
  error?: string;
}
