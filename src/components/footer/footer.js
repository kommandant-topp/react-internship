import React, {Component} from 'react';
import FooterMenu from '../footer-menu/footer-menu';

export default class Footer extends Component{
    constructor(props) {
        super(props);

        this.addMenuElement = this.props.addMenuElement;

        this.state = {
            footerLinks: [
                this.addMenuElement('оригинал-макет', 'https://handprinter.org/pages/home'),
                this.addMenuElement('Дуванов Алексей', 'https://github.com/kommandant-topp/react-internship'),
            ],
        };
    }

    render(){
        const {footerLinks} = this.state;

        return(
            <footer>
                <div className="bottom-block">
                    <FooterMenu list={footerLinks} />
                </div>
            </footer>
        );
    }
}