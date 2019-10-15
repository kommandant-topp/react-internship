import React from 'react';

export const themes = {
  light: 'light',
  dark: 'dark',
};

export const ThemeContext = React.createContext({
  theme: themes.dark,
  toggleTheme: () => {
  },
});
