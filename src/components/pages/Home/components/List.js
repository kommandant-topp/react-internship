import React from 'react';
import PropTypes from 'prop-types';

const List = (props) => {
    const {mainData, mainDataSelected,
        onDragStart, onDragOver, onDragEnd} = props;

    const items = mainData.map( (item, index) => {

        let activeClass = mainDataSelected[index]
            ? 'active'
            : '';

        return (<li
            className={activeClass}
            key={item.name.replace(/\s+/g, '').toLowerCase()}
            draggable
            onDragStart={e => onDragStart(e, index)}
            onDragOver={e => onDragOver(e, index)}
            onDragEnd={onDragEnd}
        >{item.name} <i>{item.model}</i>
        </li>);
    });

    return(
        <ol className="main-list" >
            {items}
        </ol>
    );
};

List.propTypes = {
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragEnd: PropTypes.func,
    mainData: PropTypes.arrayOf(PropTypes.object).isRequired,
    mainDataSelected: PropTypes.array
};

export default List;