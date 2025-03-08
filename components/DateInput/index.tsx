"use client"

import { FC } from "react";
import DatePicker from "react-datepicker";
import { DateInputPropTypes } from "./dateInput.types";
import { Container, Label } from "./dateInput.elements";
import "react-datepicker/dist/react-datepicker.css";

const DateInput: FC<DateInputPropTypes> = ({
  label,
  date,
  onSelect
}) => {
  return (
    <Container>
      <Label htmlFor="">{label}</Label>
      <DatePicker
        className="w-full border border-gray-400 rounded-sm px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
        selected={date}
        dateFormat={`yyyy / MM / dd`}
        onSelect={onSelect}
      />
    </Container>
  )
}

export default DateInput;
