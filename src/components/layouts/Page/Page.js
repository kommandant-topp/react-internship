import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageView from './PageView';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.menuID = 0;

    this.addMenuElement = (title, href) => {
      this.menuID = this.menuID + 1;

      return {
        id: this.menuID,
        title,
        href
      };
    };

    this.state = {
      leftTopMenu: [
        this.addMenuElement('название', 'project-name'),
        this.addMenuElement('краткое описание', 'short-desc'),
        this.addMenuElement('рабочая область', 'working-area'),
        this.addMenuElement('ссылки', 'footer-links'),
      ],

      rightTopMenu: [
        this.addMenuElement('вход', 'login'),
        this.addMenuElement('FAQ', 'faq'),
      ],

      footerLinks: [
        this.addMenuElement('оригинал-макет', 'https://handprinter.org/pages/home'),
        this.addMenuElement('Дуванов Алексей', 'https://github.com/kommandant-topp/react-internship'),
      ],
    };
  }

  render() {
    const { leftTopMenu, rightTopMenu, footerLinks } = this.state;
    const { children: contentData, mainRef } = this.props;

    return (
      <PageView
        leftTopMenu={leftTopMenu}
        rightTopMenu={rightTopMenu}
        footerLinks={footerLinks}
        contentData={contentData}
        mainRef={mainRef}
      />
    );
  }
}

Page.propTypes = {
  children: PropTypes.node,
  mainRef: PropTypes.objectOf(PropTypes.object)
};

Page.defaultProps = {
  children: null,
  mainRef: null
};
