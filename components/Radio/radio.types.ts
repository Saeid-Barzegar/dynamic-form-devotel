import { ChangeEvent, InputHTMLAttributes } from "react";

export type DataItemType = {
  id: number;
  label: string;
  value: string;
};

export interface RadioPropTypes extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  data: DataItemType[];
  selectedItem: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
