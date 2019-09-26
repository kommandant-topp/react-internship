import React, {Component} from 'react';
import PageView from './PageView';

export default class Page extends Component{

    constructor(props) {
        super(props);

        this.menuID = 0;

        this.addMenuElement = (title, href) => {
            return {
                id: this.menuID++,
                title: title,
                href: href
            }
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

    render(){

        const {leftTopMenu, rightTopMenu, footerLinks} = this.state;
        const {children: contentData} = this.props;

        return(
            <PageView
                leftTopMenu={leftTopMenu}
                rightTopMenu={rightTopMenu}
                footerLinks={footerLinks}
                contentData={contentData}
            />
        );
    }

};