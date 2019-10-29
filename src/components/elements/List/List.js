import React from 'react';
import PropTypes from 'prop-types';

import { ThemeContext } from '../../../context/theme-context';

const List = (props) => {
  const { list } = props;

  const items = (theme) => list.map(({ id, title, href }) => {
    return (
      <li key={id}>
        <a className={theme} href={`#${href}`}>{title}</a>
      </li>
    );
  });

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <ul>
          {items(theme)}
        </ul>
      )}
    </ThemeContext.Consumer>
  );
};

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default List;
