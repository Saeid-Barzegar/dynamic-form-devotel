type CheckBoxOption = {
  id: number;
  label: string;
  value: string;
};

export interface CheckBoxGroupProps {
  label: string;
  options: CheckBoxOption[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
}