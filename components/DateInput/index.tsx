"use client"

import { FC } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateInputPropTypes {
  label: string;
  date: Date;
  onSelect: (date: Date | null) => void;
}

const DateInput: FC<DateInputPropTypes> = ({
  label,
  date,
  onSelect
}) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor="">{label}</label>
      <DatePicker
        className="w-full border border-gray-400 rounded-sm px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 mt-2"
        selected={date}
        dateFormat={`yyyy / MM / dd`}
        onSelect={onSelect}
      />
    </div>
  )
}

export default DateInput;
