import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
    const {scrollToDown} = props;

    return (
        <button className="go-footer-button" onClick={scrollToDown}>Get Footer</button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func
};

export default Button;