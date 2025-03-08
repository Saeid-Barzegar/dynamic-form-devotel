import { FiledDataItemType } from "@/types/formType";
import { ChangeEvent, SelectHTMLAttributes } from "react";

export interface SelectInputPropTypes extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: FiledDataItemType[];
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}