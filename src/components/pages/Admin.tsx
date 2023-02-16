import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { configSelector, updateActived, updateMenuName } from '../../store/slices/configSlice';
import { useAppDispatch } from '../../store/store';
import { BlockPicker } from 'react-color'

type Props = {}

const Admin = (props: Props) => {
  const configReducer = useSelector(configSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [editData, setEditData] :any = useState(null)
  const [open, setOpen] = React.useState(false);
  const [btnShowColor, setBtnShowColor] = useState(null)
  const handleClickOpen = (params:any) => {
    setEditData(params)
    setBtnShowColor(params.color_btn)
    setOpen(true);
  };

  const handleClose = () => {
    setBtnShowColor(null)
    setEditData(null)
    setOpen(false);
  };

  const onUpdateActived = (params: any) => {
    const dataSet = {
      id: params.id,
      inactive: params.actived == 1 ? 0 : 1,
    }
    dispatch(updateActived(dataSet))
    setOpen(false);
  }

  const setNameValue =(params: string)=>{
    // console.log(params)
    const name = params
    const result = {...editData, name}
    setEditData(result)
  }
  const updateMenu = () => {
    let dataSet = {
      id: editData.id,
      menu: editData.name,
      color: btnShowColor
    };
    dispatch(updateMenuName(dataSet))
    setOpen(false);
    // console.log(dataSet)
  }

  const handleSelectColor = (color: any) => {
    setBtnShowColor(color.hex)
  }
  const colors = ['#FBE7C6','#B4F8C8','#A0E7E5','#FFAEBC','#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8','#dddddd']

  return (
    <Box textAlign="center" width="60%" sx={{margin: 'auto'}}>
       <Typography variant='h4' margin={5}>ตั้งค่า / <Button onClick={()=> navigate('delete')} color="error" variant="contained" sx={{fontSize:30, height:50}}>ลบคิว</Button></Typography>
       {/* <Grid container spacing={2} marginTop={1}> */}
      {configReducer.menu && configReducer.menu.map((data:any,index:number)=>{
      return (
        <Grid container key={index} padding={1} bgcolor={data.color_btn} textAlign="start" margin={1} borderRadius={2} boxShadow={1} justifyContent="space-between">
          
          <Grid item  xs={10}>
            <Typography variant="h6">{data.name} <Button onClick={()=>handleClickOpen(data)}>แก้ไข</Button></Typography> 
            <Typography >สถานะ : <span style={{backgroundColor : data.actived  == '1' ? 'lime' : 'red', padding:5, borderRadius:5}}>{data.actived  == '1' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}</span></Typography> 
          </Grid>

          <Grid item  xs={2} marginTop={1.5} textAlign="end">
            <Button onClick={()=> onUpdateActived(data)} color={data.actived == '1' ? 'error' : 'success'} variant="contained" >{data.actived  == '1' ? 'ปิด' : 'เปิด'}</Button>
          </Grid>

        </Grid>
        
      )
    })}
    {/* </Grid> */}
    {editData && <Dialog open={open}>
        <DialogTitle>แก้ไขเมนู</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            label="ชื่อเมนู"
            fullWidth
            variant="outlined"
            value={editData.name}
            onChange={(e)=> setNameValue(e.target.value)}
          />
          <Box padding={1}/>
          {btnShowColor && <BlockPicker colors={colors} width="100%" color={btnShowColor} onChangeComplete={(color:any)=> handleSelectColor(color)}/>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color='error'>ยกเลิก</Button>
          <Button onClick={()=>updateMenu()} variant="contained" color='success'>บันทีก</Button>
        </DialogActions>
      </Dialog>}
    
    </Box>
    
  )
}

export default Admin