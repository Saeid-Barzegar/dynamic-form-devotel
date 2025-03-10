import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface NavigationPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | ReactNode;
  className?: string;
}