import { ThemeProvider } from '@material-ui/core';

import { Router } from '../router';
import { theme } from '../theme';
import './App.css';

export const App = () => (
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
);
