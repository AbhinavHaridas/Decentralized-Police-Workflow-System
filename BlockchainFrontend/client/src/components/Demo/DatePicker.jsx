import React, { useEffect, useState } from "react";
import "./DatePicker.css";

function DatePicker({ placeholder, onDateSelect, reset, setIsFilterApplied }) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (reset) {
      setSelectedDate("");
    }
  }, [reset]);

  const handleDateInputChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsFilterApplied(true);
    setIsDatePickerOpen(false);
    // Call the callback function with the selected date
    onDateSelect(selectedDate);
  };

  return (
    <input
      className="datepicker"
      placeholder={placeholder}
      type={isDatePickerOpen ? "date" : "text"}
      onFocus={openDatePicker}
      onBlur={closeDatePicker}
      value={selectedDate}
      onChange={handleDateInputChange}
    />
  );
}

export default DatePicker;
