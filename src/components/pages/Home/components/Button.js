import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const { scrollToDown } = props;

  return (
    <button className="go-footer-button" onClick={scrollToDown} type="button">Get Footer</button>
  );
};

Button.propTypes = {
  scrollToDown: PropTypes.func.isRequired,
};

export default Button;
