import { UseFormRegisterReturn } from 'react-hook-form';

type CheckBoxOption = {
  id: number;
  label: string;
  value: string;
};

export interface CheckBoxGroupProps {
  label: string;
  options: CheckBoxOption[];
  register: UseFormRegisterReturn<string>;
  error?: string;
}