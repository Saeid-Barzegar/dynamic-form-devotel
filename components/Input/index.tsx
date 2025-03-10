"use client"

import { FC } from 'react';
import { InputContainer, InputElement, InputLabel } from './input.elements';
import { InputPropTypes } from './input.types';

const Input: FC<InputPropTypes> = ({
  id,
  type = "text",
  label,
  register,
  className,
  ...otherProps
}) => {
  return (
    <InputContainer className={className}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputElement
        id={id}
        type={type}
        {...register}
        {...otherProps}
      />
    </InputContainer>
  )
}

export default Input;
