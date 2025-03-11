export interface MultiSelectPropType {
  label: string;
  options: string[]
  selectedItems: string[];
  setSelectedItems: (options: string[]) => void;
  className?: string;
}