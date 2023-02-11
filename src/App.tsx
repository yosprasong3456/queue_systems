import { useState } from "react";
import Header from "./components/layouts/Header";
import "./App.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";

function App() {
  const theme = createTheme({
    components: {
      // MuiButton: {
      //   styleOverrides: {
      //     root: {
      //       borderRadius: 30,
      //     },
      //   },
      // },
      // MuiDrawer: {
      //   styleOverrides: {
      //     paper: {
      //       // backgroundImage: "url(/src/assets/images/background_menu.jpg)",
      //       backgroundImage: `url(${backgroundMenuImage})`,
      //       backgroundRepeat: "no-repeat",
      //       backgroundColor: "#f2fcff",
      //       backgroundPosition: "bottom",
      //       width: drawerWidth,
      //     },
      //   },
      // },
    },
    spacing: 8,
    typography: {
      fontFamily: "Noto Sans Thai",
      fontWeightLight: 300,
      fontWeightRegular: 400,
    },
    palette: {
      primary: blue,
      background: {
        default: "#EEE",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        <p>Hello Queue Systems</p>
        <p>Hello</p>
        <p>Hello</p>
      </Box>
    </ThemeProvider>
  );
}

export default App;
