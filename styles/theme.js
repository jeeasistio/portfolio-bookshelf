import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';

let theme = createTheme({
  palette: {
    primary: {
      light: '#444',
      main: '#333',
      dark: '#222'
    },
    secondary: {
      light: '#f2d594',
      main: '#e4c580',
      dark: '#c9b17b'
    }
  },
  typography: {
    fontFamily: 'Lato'
  }
});

theme = responsiveFontSizes(theme)

export default theme;