import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createContextProvider } from "../Context/Context";

export default function Deparature() {
  const [startDate, setStartDate] = useState(new Date("2024-05-20"));
  const [ setReturnDate] = useState(null);
  const { setDeparturePlaceholder,  } = useContext(
    createContextProvider
  );

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDepartureDateChange = (date) => {
    setStartDate(date);
    setDeparturePlaceholder(date ? formatDate(date) : "Departure");
  };



  return (
    <div className="flex justify-between items-center gap-5">
      <DatePicker
        className="border-2 h-12 p-3"
        placeholderText={startDate ? formatDate(startDate) : "Departure"}
        selected={startDate}
        onChange={handleDepartureDateChange}
      />

    </div>
  );
}
