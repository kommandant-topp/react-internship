import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
  const {
    mainData, mainDataSelected,
    onDragStart, onDragOver, onDragEnd
  } = props;

  const items = mainData.map((item, index) => {
    const activeClass = mainDataSelected[index]
      ? 'active'
      : '';

    return (
      <li
        className={activeClass}
        key={item.name.replace(/\s+/g, '').toLowerCase()}
        draggable
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={(e) => onDragOver(e, index)}
        onDragEnd={onDragEnd}
      >
        {item.name}
        {' '}
        <i>{item.model}</i>
      </li>
    );
  });

  return (
    <ol className="main-list">
      {items}
    </ol>
  );
};

List.propTypes = {
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  mainData: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainDataSelected: PropTypes.arrayOf(PropTypes.object),
};

List.defaultProps = {
  mainDataSelected: []
};

export default List;
