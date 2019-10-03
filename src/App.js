import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Page from './components/layouts/Page/Page';
import Home from './components/pages/Home/Home';


import './scss/layout/page.scss';

export default class App extends Component{

    constructor(props) {
        super(props);
        this.mainRef = React.createRef();
        this.history = createBrowserHistory();
    }

    render() {
        return (
            <Router history={this.history}>
                <Page mainRef={this.mainRef}>
                    <Switch>
                        <Route exact strict path="/" render={() => <Home mainRef={this.mainRef} />} />
                    </Switch>
                </Page>
            </Router>
        );
    }
};


