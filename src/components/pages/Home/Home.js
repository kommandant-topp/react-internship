import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import withListData from '../../../hoc/withListData';
import HomeView from './HomeView';

const Home = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [mainData, setMainData] = useState(null);
  const [mainDataSelected, setMainDataSelected] = useState([]);
  const [showScrollButton, setShowScrollButton] = useState(false);

  let currentDraggedItem = null;
  let stopDraggedItem = null;
  let indexDrag = 0;
  let dragList = [];

  const handleKeyPress = useCallback( (e) => {
    let num = 1 * e.key;

    if (Number.isNaN(num)
        || loading
        || error
        || !mainData[num]
    ) {
      return;
    }

    num = num !== 0
      ? num - 1
      : mainData.length - 1;

    const list = [...mainDataSelected];

    list[num] = list[num] === undefined
      ? true
      : !list[num];

    setMainDataSelected(list);
  }, [loading, error, mainData, mainDataSelected]);

  const handleScroll = useCallback(() => {
    const { mainRef } = props;

    const show = window.innerHeight < (mainRef.current.offsetTop - window.pageYOffset);

    if (showScrollButton !== show){
      setShowScrollButton(show);
    }

  }, [props, showScrollButton]);

  const onDragStart = (e, index) => {
    indexDrag = index;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target);
  };

  const onDragOver = (e, index) => {
    stopDraggedItem = mainData[index];
    currentDraggedItem = indexDrag !== null ? mainData[indexDrag] : null;

    if (currentDraggedItem === stopDraggedItem || !currentDraggedItem) {
      return;
    }

    dragList = mainData.filter(
      (item) => item !== currentDraggedItem
    );

    dragList.splice(index, 0, currentDraggedItem);


  };

  const onDragEnd = () => {
    setMainData(dragList);

    currentDraggedItem = null;
    stopDraggedItem = null;
    indexDrag = null
  };

  const handleOnLoad = () => {
    alert('image loaded');
  };

  const handleOnError = () => {
    alert('image loading error');
  };

  const scrollToDown = () => {
    window.scrollBy(0, document.documentElement.scrollHeight);
  };

  useEventListener('keydown', handleKeyPress);
  useEventListener('scroll', handleScroll);

  useEffect(() => {

    const { loading: propLoading, error: propError, mainData: propMainData } = props;

    setLoading(propLoading);
    setError(propError);
    setMainData(propMainData);
  }, [props]);

  return (
    <HomeView
      mainData={mainData}
      mainDataSelected={mainDataSelected}
      loading={loading}
      error={error}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      handleOnLoad={handleOnLoad}
      handleOnError={handleOnError}
      handleScroll={handleScroll}
      showScrollButton={showScrollButton}
      scrollToDown={scrollToDown}
    />
  );
};

function useEventListener(eventName, handler, element = window){

  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
      () => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = event => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);

        return () => {
          element.removeEventListener(eventName, eventListener);
        };

      },
      [eventName, element] // Re-run if eventName or element changes
  );
}

Home.propTypes = {
  mainRef: PropTypes.objectOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  mainData: PropTypes.arrayOf(PropTypes.object)
};

Home.defaultProps = {
  mainRef: null,
  loading: false,
  error: false,
  mainData: null,
};

export default withListData(Home, process.env.REACT_APP_STARSHIPS_ENDPOINT);
