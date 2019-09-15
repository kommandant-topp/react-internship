import React from 'react';
import PropTypes from 'prop-types';

import List from '../../elements/List/List';

const PageView = (props) => {
    const {leftTopMenu, rightTopMenu, footerLinks, contentData} = props;

    const footerItems = footerLinks.map( ({id, title, href}) => {
        return (
            <a href={'#' + href} target="_blank" rel="noopener noreferrer" key={id}>{title}</a>
        );
    });

    return (
        <div className="main-container">
            <header>
                <div className="top-block">
                    <div className="logo-text">
                        <span>React</span>Internship
                    </div>
                    <div className="main-menu">
                        <List list={leftTopMenu} />
                    </div>
                    <div className="right-menu">
                        <List list={rightTopMenu} />
                    </div>
                </div>
            </header>

            <main>
                {contentData}
            </main>

            <footer>
                <div className="bottom-block">
                    <div className="bottom-block">
                        {footerItems}
                    </div>
                </div>
            </footer>
        </div>
    );
};

PageView.propTypes = {
    leftTopMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    rightTopMenu: PropTypes.arrayOf(PropTypes.object).isRequired,
    footerLinks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PageView;