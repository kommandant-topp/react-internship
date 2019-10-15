import React from 'react';
import { ThemeContext } from '../../../context/theme-context';

function ThemeButton() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          type="button"
          className={`toggle-theme ${theme}`}
        >
                    Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ThemeButton;
