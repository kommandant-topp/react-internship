import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HomeView from './HomeView';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.currentDraggedItem = null;
    this.stopDraggedItem = null;

    this.handleKeyPress = function handle(e) {
      let num = 1 * e.key;

      const { loading, error, mainData } = this.state;

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


      this.setState(({ mainDataSelected }) => {
        const list = [...mainDataSelected];

        list[num] = list[num] === undefined
          ? true
          : !list[num];

        return {
          mainDataSelected: list
        };
      });
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);

    this.state = {
      loading: false,
      error: false,
      mainData: null,
      mainDataSelected: [],
      showScrollButton: false
    };

    this.getStarshipList = async () => {
      this.setState({
        loading: true
      });

      const response = await fetch(
        process.env.REACT_APP_STARWARS_API_BASE
                + process.env.REACT_APP_STARSHIPS_ENDPOINT
      );

      const jsonData = await response.json();

      this.setState({
        loading: false,
        mainData: jsonData.results
      });
    };

    this.onDragStart = (e, index) => {
      const { mainData } = this.state;

      this.currentDraggedItem = mainData[index];

      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', e.target);
    };

    this.onDragOver = (e, index) => {
      const { mainData } = this.state;
      
      this.stopDraggedItem = mainData[index];

      if (this.currentDraggedItem === this.stopDraggedItem) {
        return;
      }

      const list = mainData.filter(
        (item) => item !== this.currentDraggedItem
      );

      list.splice(index, 0, this.currentDraggedItem);

      this.setState({
        mainData: list
      });
    };

    this.onDragEnd = () => {
      this.currentDraggedItem = null;
      this.stopDraggedItem = null;
    };

    this.handleOnLoad = () => {
      alert('image loaded');
    };

    this.handleOnError = () => {
      alert('image loading error');
    };

    this.showScrollButton = (show) => {
      const { showScrollButton } = this.state;

      if (showScrollButton === show) {
        return;
      }

      this.setState({
        showScrollButton: show
      });
    };

    this.handleScroll = () => {
      const { mainRef } = this.props;

      const show = window.innerHeight < (mainRef.current.offsetTop - window.pageYOffset);
      this.showScrollButton(show);
    };

    this.scrollToDown = () => {
      window.scrollBy(0, document.documentElement.scrollHeight);
    };
  }

  componentDidMount() {
    this.getStarshipList()
      .catch(() => {
        this.setState({
          loading: false,
          error: true
        });
      });

    document.addEventListener('keydown', this.handleKeyPress);
    window.addEventListener('scroll', this.handleScroll);
  }

  getSnapshotBeforeUpdate() {
    const { mainRef } = this.props;

    const show = window.innerHeight < (mainRef.current.offsetTop - window.pageYOffset);
    return show;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.showScrollButton(snapshot);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    window.addEventListener('scroll', this.handleScroll);
  }

  render() {
    const {
      mainData, mainDataSelected, loading, error, showScrollButton 
    } = this.state;

    return (
      <HomeView
        mainData={mainData}
        mainDataSelected={mainDataSelected}
        loading={loading}
        error={error}
        onDragStart={this.onDragStart}
        onDragOver={this.onDragOver}
        onDragEnd={this.onDragEnd}
        handleOnLoad={this.handleOnLoad}
        handleOnError={this.handleOnError}
        handleScroll={this.handleScroll}
        showScrollButton={showScrollButton}
        scrollToDown={this.scrollToDown}
      />
    );
  }
}

Home.propTypes = {
  mainRef: PropTypes.objectOf(PropTypes.object)
};

Home.defaultProps = {
  mainRef: null
};
