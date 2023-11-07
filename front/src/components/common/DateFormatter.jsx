import PropTypes from 'prop-types';

export const DateFormatter = ({ date }) => {
  const apiDateString = date;
  const dateObject = new Date(apiDateString);
  const readableDate = dateObject.toLocaleString();

  return <>{readableDate}</>;
};

DateFormatter.propTypes = {
  date: PropTypes.any
}