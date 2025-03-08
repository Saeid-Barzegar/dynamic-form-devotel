"use client";

import { FC } from "react";
import { CheckBoxContainer, CheckBoxElement, CheckBoxItem, CheckBoxLabel } from "./checkbox.elements";
import { CheckBoxGroupProps } from "./checkbox.types";






const CheckBoxGroup: FC<CheckBoxGroupProps> = ({ label, options, selectedItems, onChange }) => {

  const handleCheckboxChange = (value: string) => {
    const updatedSelected = selectedItems.includes(value)
      ? selectedItems.filter((item) => item !== value)
      : [...selectedItems, value];
    onChange(updatedSelected);
  };

  return (
    <CheckBoxContainer>
      {options.map((option) => (
        <CheckBoxItem key={option.id}>
          <CheckBoxElement
            type="checkbox"
            value={option.value}
            checked={selectedItems.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
          />
          <CheckBoxLabel>{option.label}</CheckBoxLabel>
        </CheckBoxItem>
      ))}
    </CheckBoxContainer>
  );
};

export default CheckBoxGroup;
