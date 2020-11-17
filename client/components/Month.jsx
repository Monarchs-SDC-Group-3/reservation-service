import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../../public/styles/calendar.css';

const makeDatesTable = (dates) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let currDate = 0;
  const startIndex = days.indexOf(dates[0].dayOfWeek);
  return (
    <tbody className={styles.monthBody}>
      <tr>
        {days.map((day) => <td>{day.slice(0, 2)}</td>)}
      </tr>
      <tr>
        {/* Week 1 */}
        {days.map((day, index) => {
          if (index < startIndex) {
            return <td />;
          }
          return <td>{dates[currDate++].date}</td>;
        })}
      </tr>
      <tr>
        {/* Week 2 */}
        {days.map(() => <td>{dates[currDate++].date}</td>)}
      </tr>
      <tr>
        {/* Week 3 */}
        {days.map(() => <td>{dates[currDate++].date}</td>)}
      </tr>
      <tr>
        {/* Week 4 */}
        {days.map(() => <td>{dates[currDate++].date}</td>)}
      </tr>
      <tr>
        {/* Week 5 (if applicable *cough February cough*) */}
        {days.map(() => {
          if (dates[currDate]) {
            return <td>{dates[currDate++].date}</td>;
          }
          return <td />;
        })}
      </tr>
    </tbody>
  );
};

const Month = (props) => {
  const { monthArr, left } = props;
  useEffect(() => {}, [monthArr]);
  console.log(monthArr);
  if (monthArr.length === 0) {
    return <div>Loading...</div>;
  }
  const monthHeader = left
    ? (
      <div className={styles.monthHeaderLeft}>
        <span>
          <button type="submit">&lt;</button>
        </span>
        <span>{`${monthArr[0].month} ${monthArr[0].year}`}</span>
      </div>
    )
    : (
      <div className={styles.monthHeaderRight}>
        <span>{`${monthArr[0].month} ${monthArr[0].year}`}</span>
        <span>
          <button type="submit">&gt;</button>
        </span>
      </div>
    );
  return (
    <div className={styles.monthContainer}>
      {monthHeader}
      <table>
        {makeDatesTable(monthArr)}
      </table>
    </div>
  );
};

Month.propTypes = {
  monthArr: PropTypes.arrayOf(PropTypes.shape({
    dayOfWeek: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  })),
  left: PropTypes.bool,
};

Month.defaultProps = {
  monthArr: [],
  left: false,
};

export default Month;
