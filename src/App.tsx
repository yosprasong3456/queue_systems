import { useEffect, useState } from "react";
import Header from "./components/layouts/Header";
import "./App.css";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { configSelector, getConfigs } from "./store/slices/configSlice";
import { useAppDispatch } from "./store/store";
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
  const configReducer = useSelector(configSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        {configReducer.menu &&
          configReducer.menu.map((result: any, index: number) => {
            return (
              <p
                key={index}
                style={{ backgroundColor: result.color_btn, padding: 10 }}
              >
                {result.name}
              </p>
            );
          })}
      </Box>
    </ThemeProvider>
  );
}

export default App;
