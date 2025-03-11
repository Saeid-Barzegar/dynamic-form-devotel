"use client"

import { FC } from 'react';
import { FiledDataItemType } from '@/types/formType';
import { SelectInputPropTypes } from './selectInput.types';
import { SelectInputContainer, MainLabel, SelectBox, SelectOption } from './selectInput.elements';
import { IoChevronDown } from "react-icons/io5";
import { ErrorMessage } from '@/elements/common.element';

const SelectInput: FC<SelectInputPropTypes> = ({
  id,
  label,
  className,
  options,
  register,
  error
}) => {

  return (
    <SelectInputContainer className={className}>
      <MainLabel htmlFor={id}>{label}</MainLabel>
      <IoChevronDown className="text-lg absolute right-3 bottom-[15px] text-gray-500" />
      <SelectBox id={id} {...register} >
        <option value="" className='text-gray-400'>-- Select an option --</option>
        {options.map((item: FiledDataItemType) => (
          <SelectOption key={item.id} value={item.value}>
            {item.label}
          </SelectOption>
        ))}
      </SelectBox>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </SelectInputContainer>
  )
}

export default SelectInput;
