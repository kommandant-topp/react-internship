import React from 'react';
import PropTypes from 'prop-types';

const FooterMenu = (props) => {
    const {list} = props;

    const items = list.map( ({id, title, href}) => {
        return (
            <a href={'#' + href} target="_blank" rel="noopener noreferrer" key={id}>{title}</a>
        );
    });

    return (
        <div className="bottom-block">
            {items}
        </div>
    );
};

FooterMenu.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default FooterMenu;