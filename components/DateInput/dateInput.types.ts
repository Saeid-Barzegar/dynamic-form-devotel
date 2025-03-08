export interface DateInputPropTypes {
  label: string;
  date: Date;
  onSelect: (date: Date | null) => void;
};