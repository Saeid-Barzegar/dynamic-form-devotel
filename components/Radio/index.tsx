"use client"

import { FC } from "react";
import { DataItemType, RadioPropTypes } from "./types";
import { MainContainer, MainLabel, RadioContainer, RadioElement, RadioLabel } from "./elements";


const Radio: FC<RadioPropTypes> = ({
  label,
  name,
  data,
  selectedItem,
  onChange
}) => {
  console.log({ data })
  return (
    <MainContainer>
      <MainLabel htmlFor="">{label}</MainLabel>
      {data.map((radio: DataItemType) => (
        <RadioContainer key={radio.id}>
          <RadioElement
            type="radio"
            name={name}
            id={radio.value}
            value={radio.value}
            checked={radio.value === selectedItem}
            onChange={onChange}
          />
          <RadioLabel htmlFor={radio.value}>{radio.label}</RadioLabel>
        </RadioContainer>
      ))}
    </MainContainer>
  );
};

export default Radio;
