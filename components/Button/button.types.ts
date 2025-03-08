import { ReactNode } from 'react';

export interface NavigationPropTypes {
  children: string | ReactNode;
  onClick: () => void;
  className?: string;
}