import { ChangeEvent, InputHTMLAttributes } from 'react';

type InputType = 'text' | 'number';

export interface InputPropTypes extends InputHTMLAttributes<HTMLInputElement>{
  type: InputType;
  value: string;
  name: string;
  label: string;
  placeholder?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};