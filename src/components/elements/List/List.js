import React from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../../context/theme-context';

const List = (props) => {
  const { list } = props;

  const items = list.map(({ id, title, href }) => {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <li key={id}>
            <a className={theme} href={`#${href}`}>{title}</a>
          </li>
        )}
      </ThemeContext.Consumer>
    );
  });

  return (
    <ul>
      {items}
    </ul>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
