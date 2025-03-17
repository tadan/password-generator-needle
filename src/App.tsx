import React from 'react';
import './App.css';
import PasswordGenerator from './components/PasswordGenerator/PasswordGenerator';
import { NeedleThemeProvider } from '@neo4j-ndl/react';

function App() {
  return (
    <NeedleThemeProvider theme="light" wrapperProps={{ isWrappingChildren: false }}>
      {<PasswordGenerator minLength={8} maxLength={20} defaultLength={12} />}
    </NeedleThemeProvider>
  );
}

export default App;
