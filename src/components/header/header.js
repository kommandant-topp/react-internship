import React, {Component} from 'react';
import TopMenu from '../top-menu/top-menu';

export default class Header extends Component{
    constructor(props) {
        super(props);

        this.addMenuElement = this.props.addMenuElement;

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
        };
    }

    render(){

        const {leftTopMenu, rightTopMenu} = this.state;

        return (
            <header>

                <div className="top-block">
                    <div className="logo-text">
                        <span>React</span>Internship
                    </div>
                    <div className="main-menu">
                        <TopMenu list={leftTopMenu} />
                    </div>
                    <div className="right-menu">
                        <TopMenu list={rightTopMenu} />
                    </div>
                </div>

            </header>
        );
    }
};