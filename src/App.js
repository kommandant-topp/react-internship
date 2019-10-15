import React, { Component } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeContext, themes } from './context/theme-context';
import ThemeButton from './components/elements/ThemeButton/ThemeButton';
import Page from './components/layouts/Page/Page';
import Home from './components/pages/Home/Home';


import './scss/layout/page.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.mainRef = React.createRef();
    this.history = createBrowserHistory();

    this.toggleTheme = () => {
      const { light, dark } = themes;

      this.setState((state) => ({
        theme:
            state.theme === dark
              ? light
              : dark,
      }));
    };

    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    const { theme, toggleTheme } = this.state;

    return (
      <Router history={this.history}>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <Page mainRef={this.mainRef}>
            <ThemeButton />
            <Switch>
              <Route exact strict path="/" render={() => <Home mainRef={this.mainRef} />} />
            </Switch>
          </Page>
        </ThemeContext.Provider>
      </Router>
    );
  }
}
