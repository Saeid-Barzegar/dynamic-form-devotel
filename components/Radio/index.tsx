"use client";

import { FC } from "react";
import { DataItemType, RadioPropTypes } from "./radio.types";
import { MainContainer, MainLabel, RadioContainer, RadioElement, RadioLabel } from "./radio.elements";

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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </MainContainer>
  );
};

export default Radio;
