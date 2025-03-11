"use client"
// libraries
import { FC } from "react";
import DatePicker from "react-datepicker";
// types
import { DateInputPropTypes } from "./dateInput.types";
// elements
import { Container, Label } from "./dateInput.elements";
import { ErrorMessage } from "../Radio/radio.elements";
// styles
import "react-datepicker/dist/react-datepicker.css";

const DateInput: FC<DateInputPropTypes> = ({
  id,
  label,
  date,
  onSelect,
  error,
  required,
  className
}) => {
  return (
    <Container className={className}>
      <Label htmlFor={id}>{label}</Label>
      <DatePicker
        id={id}
        className="w-full border border-gray-400 rounded-sm px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
        selected={date}
        dateFormat={`yyyy / MM / dd`}
        onSelect={onSelect}
        required={required}
        autoComplete="off"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
}

export default DateInput;
