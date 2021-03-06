import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Month from './Month';
import styles from '../../public/styles/CalendarBody.css';

const CalendarBody = (props) => {
  const {
    dates,
    minDays,
    checkInDate,
    checkInClicked,
    checkOutDate,
    checkOutClicked,
    handleCheckInSelect,
    handleCheckOutSelect,
  } = props;
  const [monthsToRender, setMonthsToRender] = useState([]);
  const [leftMonthIndex, setLeftMonthIndex] = useState(0);
  const [rightMonthIndex, setRightMonthIndex] = useState(1);

  useEffect(() => {
    setMonthsToRender([dates[leftMonthIndex], dates[rightMonthIndex]]);
  }, [dates, leftMonthIndex, rightMonthIndex, checkInDate]);

  const handleScrollRightClick = () => {
    setLeftMonthIndex(leftMonthIndex + 1);
    setRightMonthIndex(rightMonthIndex + 1);
  };

  const handleScrollLeftClick = () => {
    setLeftMonthIndex(leftMonthIndex - 1);
    setRightMonthIndex(rightMonthIndex - 1);
  };

  if (!dates) {
    return <div>Loading...</div>;
  }
  const scrollRight = rightMonthIndex !== dates.length - 1
    ? <button className={styles.calendarBodyScrollRight} type="submit" onClick={handleScrollRightClick}>&gt;</button>
    : <button className={styles.calendarBodyScrollRight} type="submit" disabled>&gt;</button>;

  const scrollLeft = leftMonthIndex === 0
    ? <button className={styles.calendarBodyScrollLeft} type="submit" disabled>&lt;</button>
    : <button className={styles.calendarBodyScrollLeft} type="submit" onClick={handleScrollLeftClick}>&lt;</button>;

  return (
    <div className={styles.calendarBody}>
      {scrollRight}
      {scrollLeft}
      {monthsToRender.map((month) => (
        <div>
          <Month
            monthArr={month}
            minDays={minDays}
            checkInDate={checkInDate}
            checkInClicked={checkInClicked}
            checkOutDate={checkOutDate}
            checkOutClicked={checkOutClicked}
            handleCheckInSelect={handleCheckInSelect}
            handleCheckOutSelect={handleCheckOutSelect}
          />
        </div>
      ))}
    </div>
  );
};

CalendarBody.propTypes = {
  dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  }))).isRequired,
  minDays: PropTypes.number,
  checkInClicked: PropTypes.bool,
  checkInDate: PropTypes.shape({
    dayOfWeek: PropTypes.string,
    month: PropTypes.string,
    date: PropTypes.string,
    year: PropTypes.string,
    available: PropTypes.bool,
  }),
  checkOutClicked: PropTypes.bool,
  checkOutDate: PropTypes.shape({
    dayOfWeek: PropTypes.string,
    month: PropTypes.string,
    date: PropTypes.string,
    year: PropTypes.string,
    available: PropTypes.bool,
  }),
  handleCheckInSelect: PropTypes.func,
  handleCheckOutSelect: PropTypes.func,
};

CalendarBody.defaultProps = {
  minDays: 0,
  checkInClicked: false,
  checkInDate: {},
  checkOutClicked: false,
  checkOutDate: {},
  handleCheckInSelect: null,
  handleCheckOutSelect: null,
};

export default CalendarBody;
