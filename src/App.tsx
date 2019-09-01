import React from 'react';
import { ThemeContext } from 'styled-components';
import Chat from './components/Chat';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeContext.Provider value={theme}>
      <Chat />
    </ThemeContext.Provider>
  );
}

export default App;
