import { createTheme } from '@mui/material/styles';
import { green, grey, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F073B',
    },
    secondary: {
      main: '#DAE38D',
      dark: '#DAE38D',
    },
    info: {
      main: grey[400],
      contrastText: grey[50],
    },
  },
/*  typography: {
    header: {

    }
  }*/
});

export default theme;
