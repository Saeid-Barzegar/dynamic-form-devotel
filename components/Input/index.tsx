"use client"

import { FC } from 'react';
import { InputContainer, InputElement, InputLabel } from './input.elements';
import { InputPropTypes } from './input.types';

const Input: FC<InputPropTypes> = ({
  type = "text",
  name,
  value,
  label,
  placeholder,
  onChange,
  ...otherProps
}) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputElement
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        placeholder=""
        {...otherProps}
      />
    </InputContainer>
  )
}

export default Input;
