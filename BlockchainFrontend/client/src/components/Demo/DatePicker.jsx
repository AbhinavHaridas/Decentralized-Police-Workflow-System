import React, { useEffect, useState } from "react";
// import "./DatePicker.css";

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
      className="appearance-none block w-full bg-gray-50 text-gray-700 border rounded pb-3 pt-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white border border-blue-700"
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
