"use client"

import { FC } from 'react';
import { ButtonElement } from './button.elements';
import { NavigationPropTypes } from './button.types';


const Navigation: FC<NavigationPropTypes> = ({
  children,
  onClick,
  className,
  type = 'button'
}) => {
  return (
    <ButtonElement
      type={type}
      className={className}
      onClick={onClick}
    >{children}</ButtonElement>
  )
}

export default Navigation;
