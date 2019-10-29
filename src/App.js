import React, { useState, useRef } from 'react';
import { Switch, Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeContext, themes } from './context/theme-context';
import ThemeButton from './components/elements/ThemeButton/ThemeButton';
import Page from './components/layouts/Page/Page';
import Home from './components/pages/Home/Home';


import './scss/layout/page.scss';

const history = createBrowserHistory();

const App = () => {
  const { light, dark } = themes;

  const mainRef = useRef(null);

  const [theme, setTheme] = useState(light);

  const toggleTheme = () => {
    setTheme(
      theme === dark
        ? light
        : dark
    );
  };

  return (
    <Router history={history}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Page mainRef={mainRef}>
          <ThemeButton />
          <Switch>
            <Route exact strict path="/" render={() => <Home mainRef={mainRef} />} />
          </Switch>
        </Page>
      </ThemeContext.Provider>
    </Router>
  );
};

export default App;
