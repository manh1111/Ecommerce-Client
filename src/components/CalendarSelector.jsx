import { useState } from "react";
import PropTypes from "prop-types";
import RangeDatePicker from "@ui/RangeDatePicker"; // Update this path if incorrect.

const CalendarSelector = ({
  wrapperClass,
  label = "Thời gian bán hàng",
  id,
  onDateChange,
}) => {
  const [currentDates, setCurrentDates] = useState({ startDate: "", endDate: "" });

  const handleDateChange = (startDate, endDate) => {
    setCurrentDates({ startDate, endDate });
    if (onDateChange) {
      onDateChange({ startDate, endDate });
    }
  };

  return (
    <div className={`${wrapperClass || ""} flex flex-col gap-2.5 w-full`}>
      <label className="h5 w-fit text-xl" htmlFor={id}>
        {label}:
      </label>
      <RangeDatePicker id={id} onChange={handleDateChange} />
    </div>
  );
};

CalendarSelector.propTypes = {
  wrapperClass: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDateChange: PropTypes.func,
};

export default CalendarSelector;
