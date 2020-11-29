import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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

export default theme;