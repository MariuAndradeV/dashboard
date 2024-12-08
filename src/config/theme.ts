import { createTheme } from '@mui/material/styles';
import { green, grey, purple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[700],
    },
    secondary: {
      main: green[200],
    },
    info: {
      main: grey[400],
      contrastText: grey[50],
    },

  },
});



export default theme;
