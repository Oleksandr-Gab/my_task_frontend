import {createContext, useEffect, useState } from "react";
// модули для настройки темы Material-UI внутри ThemeProvider
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

// import CssBaseline from "@mui/material/CssBaseline";


export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [thema, setThema] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", thema);
  }, [thema]);

  //  создание темы MUI
  const muiTheme = createTheme({
    // смена дефолтного шрифта MUI
    typography: {
      fontFamily: "Poppins, Arial, sans-serif",
    },
  });

  return (
    <ThemeContext.Provider value={[thema, setThema]}>
      <MuiThemeProvider theme={muiTheme}>
        {/* <CssBaseline /> */}
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
