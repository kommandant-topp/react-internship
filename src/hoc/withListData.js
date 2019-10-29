import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const withListData = (Container, endpoint) => {
  const Wrapped = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [mainData, setMainData] = useState(null);

    // console.log(loading);

    const getDataList = async () => {
      setLoading(true);

      const response = await fetch(
        process.env.REACT_APP_STARWARS_API_BASE + endpoint
      );

      const jsonData = await response.json();

      setMainData(jsonData.results);
      setLoading(false);
    };

    useEffect(() => {
      getDataList()
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }, []);


    return (
      <Container
        mainData={mainData}
        loading={loading}
        error={error}
        {...props}
      />
    );
  };

  return Wrapped;
};

withListData.propTypes = {
  Container: PropTypes.element,
};

export default withListData;
