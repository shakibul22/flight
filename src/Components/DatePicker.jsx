import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createContextProvider } from "../Context/Context";

export default function DatePickers() {
  const [startDate, setStartDate] = useState(new Date("2024-05-20"));
  const [returnDate, setReturnDate] = useState(null);
  const { setDeparturePlaceholder, setReturnPlaceholder } = useContext(
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

  const handleReturnDateChange = (date) => {
    setReturnDate(date);
    setReturnPlaceholder(date ? formatDate(date) : "Return");
  };

  return (
    <div className="flex justify-between items-center gap-5">
      <DatePicker
        className="border-2 h-12 p-3"
        placeholderText={startDate ? formatDate(startDate) : "Departure"}
        selected={startDate}
        onChange={handleDepartureDateChange}
      />
      <DatePicker
        className="border-2 h-12 p-3"
        placeholderText={returnDate ? formatDate(returnDate) : "Return"}
        selected={returnDate}
        onChange={handleReturnDateChange}
      />
    </div>
  );
}
