import React from 'react';
import PropTypes from 'prop-types';

import PageView from './PageView';

const Page = (props) => {
  let menuID = 0;

  const addMenuElement = (title, href) => {
    menuID += 1;

    return {
      id: menuID,
      title,
      href
    };
  };

  const leftTopMenu = [
    addMenuElement('название', 'project-name'),
    addMenuElement('краткое описание', 'short-desc'),
    addMenuElement('рабочая область', 'working-area'),
    addMenuElement('ссылки', 'footer-links'),
  ];

  const rightTopMenu = [
    addMenuElement('вход', 'login'),
    addMenuElement('FAQ', 'faq'),
  ];

  const footerLinks = [
    addMenuElement('оригинал-макет', 'https://handprinter.org/pages/home'),
    addMenuElement('Дуванов Алексей', 'https://github.com/kommandant-topp/react-internship'),
  ];

  const { children: contentData, mainRef } = props;

  return (
    <PageView
      leftTopMenu={leftTopMenu}
      rightTopMenu={rightTopMenu}
      footerLinks={footerLinks}
      contentData={contentData}
      mainRef={mainRef}
    />
  );
};

Page.propTypes = {
  children: PropTypes.node,
  mainRef: PropTypes.objectOf(PropTypes.object)
};

Page.defaultProps = {
  children: null,
  mainRef: null
};

export default Page;
