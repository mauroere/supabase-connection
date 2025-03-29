import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Catalog from './index';
import { initializeDatabase } from './sqliteClient';

function App() {
  useEffect(() => {
    async function initDb() {
      try {
        await initializeDatabase();
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    }
    initDb();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Catalog />
    </ThemeProvider>
  );
}

export default App;
