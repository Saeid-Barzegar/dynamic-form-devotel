"use client";

import { FC } from "react";
import { DataItemType, RadioPropTypes } from "./radio.types";
import { MainContainer, MainLabel, RadioContainer, RadioElement, RadioLabel } from "./radio.elements";
import { ErrorMessage } from "@/elements/common.element";

const Radio: FC<RadioPropTypes> = ({
  id,
  label,
  data,
  register,
  error
}) => {
  return (
    <MainContainer>
      <MainLabel>{label}</MainLabel>
      {data.map((radio: DataItemType) => (
        <RadioContainer key={radio.id}>
          <RadioElement
            id={`${id}-${radio.value}`}
            type="radio"
            value={radio.value}
            {...register}
          />
          <RadioLabel htmlFor={`${id}-${radio.value}`}>{radio.label}</RadioLabel>
        </RadioContainer>
      ))}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </MainContainer>
  );
};

export default Radio;
