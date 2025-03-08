"use client"

import { FC } from 'react';
import { FiledDataItemType } from '@/types/formType';
import { SelectInputPropTypes } from './selectInput.types';
import { SelectInputContainer, MainLabel, SelectBox, SelectOption } from './selectInput.elements'
import { IoChevronDown } from "react-icons/io5";

const SelectInput: FC<SelectInputPropTypes> = ({
  label,
  className,
  options,
  value,
  onChange
}) => {

  return (
    <SelectInputContainer className={className}>
      <MainLabel htmlFor="HeadlineAct">{label}</MainLabel>
      <IoChevronDown className="text-lg absolute right-3 bottom-[15px] text-gray-500" />
      <SelectBox
        id="HeadlineAct"
        name="HeadlineAct"
        value={value}
        onChange={onChange}
      >
        <option value="" className='text-gray-400'>-- Select an option --</option>
        {options.map((item: FiledDataItemType) => (
          <SelectOption key={item.id} value={item.value}>
            {item.label}
          </SelectOption>
        ))}
      </SelectBox>
    </SelectInputContainer>
  )
}

export default SelectInput;
