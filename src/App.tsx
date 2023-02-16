import { useEffect, useState } from "react";
import Header from "./components/layouts/Header";
import "./App.css";
import { Box, Container, createTheme, ThemeProvider } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { configSelector, getConfigs } from "./store/slices/configSlice";
import { useAppDispatch } from "./store/store";
import { Home } from "@mui/icons-material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import QueueHome from "./components/pages/QueueHome";
import Rooms from "./components/pages/Rooms";
import RoomSelected from "./components/pages/RoomSelected";
import Admin from "./components/pages/Admin";
import AdminDelete from "./components/pages/AdminDelete";
function App() {
  // console.log(import.meta.env.VITE_HOST_DEV)
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
      <Container maxWidth={false} >
      
      
        {/* <Box paddingTop={8}/> */}
        {/* <Box sx={{ p: 0 }}> */}
        <Routes>
          <Route path="/" element={<FristPage />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/queuehome" element={<QueueHome />}/>
          <Route path="/rooms" element={<Rooms />}/>
          <Route path="/room/:id" element={<RoomSelected />}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/admin/delete" element={<AdminDelete />}/>
          
        </Routes>
      {/*
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
      */}
      {/* </Box>  */}
      </Container>

    </ThemeProvider>
  );
}

const FristPage =()=>{
  return (
    <h1 style={{ textAlign : 'center'}}>Hello World!</h1>
  )
}

export default App;
