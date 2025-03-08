"use client"

import { FC } from 'react';
import { ButtonElement } from './button.elements';
import { NavigationPropTypes } from './button.types';


const Navigation: FC<NavigationPropTypes> = ({
  children,
  onClick,
  className
}) => {
  return (
    <ButtonElement
      className={className}
      onClick={onClick}
    >{children}</ButtonElement>
  )
}

export default Navigation;
