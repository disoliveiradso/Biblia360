import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const [fontSize, setFontSize] = useState(16);
  const [sepia, setSepia] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Detect system theme initially
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', highContrast ? 'high-contrast' : theme);
    document.documentElement.style.setProperty('--font-size-base', `${fontSize}px`);
    document.documentElement.style.setProperty('--sepia-filter', sepia ? 'sepia(0.3)' : 'sepia(0)');
  }, [theme, fontSize, sepia, highContrast]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const increaseFont = () => setFontSize(prev => Math.min(prev + 2, 32));
  const decreaseFont = () => setFontSize(prev => Math.max(prev - 2, 12));
  const toggleSepia = () => setSepia(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  return (
    <ThemeContext.Provider value={{
      theme, toggleTheme,
      fontSize, increaseFont, decreaseFont,
      sepia, toggleSepia,
      highContrast, toggleHighContrast
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
