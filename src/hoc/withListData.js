import React, { Component } from 'react';
import PropTypes from 'prop-types';

const withListData = (Container, endpoint) => {
  class Wrapped extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false,
        error: false,
        mainData: null,
      };

      this.getDataList = async () => {
        this.setState({
          loading: true
        });

        const response = await fetch(
          process.env.REACT_APP_STARWARS_API_BASE
                    + endpoint
        );

        const jsonData = await response.json();

        this.setState({
          loading: false,
          mainData: jsonData.results
        });
      };
    }

    componentDidMount() {
      this.getDataList()
        .catch(() => {
          this.setState({
            loading: false,
            error: true
          });
        });
    }

    render() {
      const { mainData, loading, error } = this.state;

      return (
        <Container
          mainData={mainData}
          loading={loading}
          error={error}
          {...this.props}
        />
      );
    }
  }

  return Wrapped;
};

withListData.propTypes = {
  Container: PropTypes.element,
};

export default withListData;
