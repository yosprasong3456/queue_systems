import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} onDoubleClick={()=> navigate('/admin')}>
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
