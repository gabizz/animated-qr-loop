import { Inter, Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { blue, green, orange, red } from '@mui/material/colors';

const inter = Inter({ subsets: ['latin'] })
const roboto = Roboto({
  weight: ["100" ,"300" ,"400" ,"500" ,"700" ,"900"],
  subsets: ['latin'],
})


// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: red.A700
    },
    error: {
      main: red[900],
    },
    info: {
      main: blue.A100
    },
    success: {
      main: green.A700
    },
    warning: {
      main: orange[700]
    }
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});

export default theme;
