import React, {Component} from 'react';

import Header from '../header/header';
import Main from '../main/main';
import Footer from '../footer/footer';

import '../../assets/components/app/main.css';

export default class App extends Component{
    constructor() {
        super();

        this.menuID = 0;

        this.addMenuElement = (title, href) => {
          return {
            id: this.menuID++,
            title: title,
            href: href
          }
        };
    }

    render(){

      return(
          <div className="main-container">
            <Header addMenuElement={this.addMenuElement} />
            <Main />
            <Footer addMenuElement={this.addMenuElement} />
          </div>
      );
    }
};


