import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type InputType = 'text' | 'number';

export interface InputPropTypes extends InputHTMLAttributes<HTMLInputElement>{
  type: InputType;
  name: string;
  label: string;
  register: UseFormRegisterReturn<string>;
  error?: string;
};