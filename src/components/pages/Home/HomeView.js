import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../elements/Loader/Loader';
import Error from '../../elements/Error/Error';
import List from './components/List';
import Button from './components/Button';

const HomeView = (props) => {
    const { mainData, mainDataSelected,
        loading, error,
        onDragStart, onDragOver, onDragEnd,
        handleOnLoad, handleOnError, showScrollButton,
        scrollToDown
    } = props;

    const dataContainer = (!loading && !error && mainData)
        ? <List
            mainData={mainData}
            mainDataSelected={mainDataSelected}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd} />
        : null;

    const loadingContainer = loading ? <Loader /> : null;
    const errorContainer = error ? <Error /> : null;
    const isButton = showScrollButton ? <Button scrollToDown={scrollToDown} /> : null;

    return (
        <div className="main-block">
            {isButton}
            <section>
                <div className="name-area">
                    <h3 id="project-name">ReactInternship.Lesson10</h3>
                </div>
            </section>
            <section>
                <div className="desc-area">
                    <h3 id="short-desc">Краткое описание</h3>

                    <p>
                        Husky and scroll event
                    </p>
                </div>

            </section>
            <section>
                <div className="main-area">
                    <h3 id="working-area">Рабочая область</h3>
                    <p>корабли</p>
                    {loadingContainer}
                    {errorContainer}
                    {dataContainer}

                    <div className="info">
                        нажатие 1-9 меняет статус пунктов 1-9, нажатие 0 меняет статус пункта 10
                    </div>
                    <div>
                        <img
                            alt="catz!"
                            src={process.env.REACT_APP_IMAGE_FOR_EVENTS}
                            onLoad={handleOnLoad}
                            onError={handleOnError}
                        />
                    </div>

                </div>
            </section>
        </div>
    );
};

HomeView.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    mainData: PropTypes.arrayOf(PropTypes.object),
    mainDataSelected: PropTypes.array,
    onDragStart: PropTypes.func,
    onDragOver: PropTypes.func,
    onDragEnd: PropTypes.func,
    handleOnLoad: PropTypes.func,
    handleOnError: PropTypes.func
};

export default HomeView;