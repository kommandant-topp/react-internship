import React from 'react';
import PropTypes from 'prop-types';

const TopMenu = (props) => {
    const {list} = props;

    const items = list.map( ({id, title, href}) => {
        return (
            <li key={id}>
                <a href={'#' + href}>{title}</a>
            </li>
        );
    });

    return (
        <ul>
            {items}
        </ul>
    );
};

TopMenu.propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TopMenu;