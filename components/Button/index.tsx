"use client"

import { FC, ReactNode } from 'react';
import { ButtonElement } from './button.elements'

interface NavigationPropTypes {
  children: string | ReactNode;
  onClick: () => void;
  className?: string;
}

const Navigation: FC<NavigationPropTypes> = ({ children, onClick, className }) => {
  return (
    <ButtonElement
      className={className}
      onClick={onClick}
    >{children}</ButtonElement>
  )
}

export default Navigation;
