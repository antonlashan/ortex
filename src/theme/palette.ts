import { colors } from '@material-ui/core';
import { PaletteOptions } from '@material-ui/core/styles/createPalette';

const white = '#FFFFFF';

export const palette: PaletteOptions = {
  primary: {
    contrastText: white,
    dark: colors.grey[900],
    main: colors.grey['A400'],
    light: colors.grey[50],
  },
  secondary: {
    contrastText: white,
    dark: colors.cyan[900],
    main: '#01BFBD',
    light: '#01bfbd2e',
  },
  success: {
    contrastText: white,
    dark: 'rgb(30, 70, 32)',
    main: colors.green[600],
    light: 'rgb(237, 247, 237)',
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
  },
  text: {
    primary: colors.blueGrey[900],
    secondary: '#6b6b6b',
  },
  background: {
    default: '#f5f5f5',
    paper: white,
  },
};
