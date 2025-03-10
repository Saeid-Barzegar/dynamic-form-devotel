import { FiledDataItemType } from "@/types/formType";
import { SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectInputPropTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: FiledDataItemType[];
  register: UseFormRegisterReturn<string>;
  error?: string;
}