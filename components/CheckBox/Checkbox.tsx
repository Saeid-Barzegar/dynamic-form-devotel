"use client";

import { FC } from "react";
import { CheckBoxContainer, CheckBoxElement, CheckBoxItem, CheckBoxLabel } from "./checkbox.elements";
import { CheckBoxGroupProps } from "./checkbox.types";
import { ErrorMessage } from "@/elements/common.element";

const CheckBoxGroup: FC<CheckBoxGroupProps> = ({
  label,
  options,
  register,
  error
}) => {

  return (
    <CheckBoxContainer>
      <p>{label}</p>
      {options.map((option) => (
        <CheckBoxItem key={option.id}>
          <CheckBoxElement
            type="checkbox"
            value={option.value}
            {...register}
          />
          <CheckBoxLabel>{option.label}</CheckBoxLabel>
        </CheckBoxItem>
      ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </CheckBoxContainer>
  );
};

export default CheckBoxGroup;
