"use client";

import { FC } from "react";
import tw from "tailwind-styled-components";

type CheckBoxOption = {
  id: number;
  label: string;
  value: string;
};

interface CheckBoxGroupProps {
  label: string;
  options: CheckBoxOption[];
  selectedItems: string[];
  onChange: (selected: string[]) => void;
}

const CheckBoxContainer = tw.div`flex flex-col space-y-2 mt-4`;
const CheckBoxItem = tw.label`flex items-center space-x-2 cursor-pointer`;
const CheckBoxElement = tw.input`w-5 h-5 cursor-pointer accent-indigo-500`;
const CheckBoxLabel = tw.span`text-gray-800`;

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
