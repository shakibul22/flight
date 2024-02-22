import { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function DatePicker() {
  // Define state variable to hold the selected departure date
  const [departureDate, setDepartureDate] = useState(null);

  const handleChange = (newDateRange) => {
    // Extract the departure date from the selected date range
    const [departure, _] = newDateRange;
    // Update the state with the departure date
    setDepartureDate(departure);
  };
  console.log(departureDate);
  return (
    <div className="w-[45vh]">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          {/* Pass the selectedDateRange as the value prop */}
          <DateRangePicker
            localeText={{ start: "Depart", end: "Return" }}
            value={departureDate ? [departureDate, null] : [null, null]}
            onChange={(newDateRange) => handleChange(newDateRange)}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
