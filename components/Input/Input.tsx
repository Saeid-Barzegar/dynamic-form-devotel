"use client"

import { FC } from 'react';
import { InputContainer, InputElement, InputLabel } from './input.elements';
import { InputPropTypes } from './input.types';
import { ErrorMessage } from '@/elements/common.element';

const Input: FC<InputPropTypes> = ({
  id,
  type = "text",
  label,
  register,
  className,
  error,
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
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  )
}

export default Input;
