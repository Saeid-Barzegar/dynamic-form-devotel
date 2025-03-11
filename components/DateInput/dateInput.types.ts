export interface DateInputPropTypes {
  id: string;
  label: string;
  date: Date;
  onSelect: (date: Date | null) => void;
  error?: string;
  required?: boolean;
  className?: string;
};