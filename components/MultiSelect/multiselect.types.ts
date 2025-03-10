export interface MultiSelectPropType {
  options: string[]
  selectedItems: string[];
  setSelectedItems: (options: string[]) => void;
  className?: string;
}