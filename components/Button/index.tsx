"use client"

import { FC } from 'react';
import { ButtonElement } from './button.elements';
import { NavigationPropTypes } from './button.types';


const Navigation: FC<NavigationPropTypes> = ({
  children,
  onClick,
  className,
  type = 'button',
  disabled = false,
}) => {
  return (
    <ButtonElement
      className={className}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonElement>
  )
}

export default Navigation;
