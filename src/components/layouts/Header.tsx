import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";

interface Props {}

export default function Header(props: Props) {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1}}>
     
      <AppBar position="static" sx={{backgroundColor: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar component="nav">
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            โรงพยาบาลมะเร็งอุดรธานี
          </Typography>

          <Box sx={{ display: { sm: "block" } }}>
            <Button sx={{ color: "#fff" }} onClick={()=> navigate('/dashboard')}>Dashboard</Button>
            <Button sx={{ color: "#fff" }} onClick={()=> navigate('/rooms')}>เลือกห้องบริการ</Button>
            <Button sx={{ color: "#fff" }} onClick={()=> navigate('/queuehome')}>กดคิว</Button>
          </Box>
        </Toolbar>
        </Container>
      </AppBar>
     
    </Box>
  );
}
