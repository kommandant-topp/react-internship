import React from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from '../../../../context/theme-context';

const Button = (props) => {
  const { scrollToDown } = props;

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <button className={`go-footer-button ${theme}`} onClick={scrollToDown} type="button">Get Footer</button>
      )}
    </ThemeContext.Consumer>
  );
};

Button.propTypes = {
  scrollToDown: PropTypes.func.isRequired,
};

export default Button;
