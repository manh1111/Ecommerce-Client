import { useState } from "react";
import PropTypes from "prop-types";
import RangeDatePicker from "@ui/RangeDatePicker";
import { useEffect } from "react";

const CalendarSelector = ({
    wrapperClass,
    label = "Thời gian bán hàng",
    id,
    onDateChange,
    selectedDates,
  }) => {
    const [currentDates, setCurrentDates] = useState(selectedDates);
  
    useEffect(() => {
      setCurrentDates(selectedDates); 
    }, [selectedDates]);
  
    const handleDateChange = (range) => {
      console.log("range", range);
      const { startDate, endDate } = range || {};
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
        <RangeDatePicker
          id={id}
          onChange={handleDateChange}
          selectedDates={currentDates}  // Pass currentDates to RangeDatePicker
        />
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
