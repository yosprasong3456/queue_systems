import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { queueSelector, setModalCallQ, updateQueue } from "../store/slices/queueSlice";
import { useAppDispatch } from "../store/store";

type Props = {
  dashboard? : string
  soundConfig? : string
};

const CallAudio = (props: Props) => {
  const dispatch = useAppDispatch();
  const queuereducer = useSelector(queueSelector);
 useEffect(() => {
  startAudio(queuereducer.showQueue)
 }, [queuereducer.modalCall])
 
 const startAudio =(params : any = 0)=>{
  if(params){
    if(props.soundConfig == '1'){
      console.log('sound = 1')
      const audio = new Audio("/public/audio/call.mp3");
      const audio1 = new Audio(`/public/audio/${params.queue_no.charAt(0)}.mp3`);
      const audio2 = new Audio(`/public/audio/${params.queue_no.charAt(1)}.mp3`);
      const audio3 = new Audio(`/public/audio/${params.queue_no.charAt(2)}.mp3`);
      const audio4 = new Audio(`/public/audio/${params.queue_no.charAt(3)}.mp3`);
      const audio5 = new Audio(`/public/audio/${params.queue_type}.mp3`);
      const service = new Audio(`/public/audio/service.mp3`);
  
      audio.play();
      audio.addEventListener('ended',function(){
        audio1.play();
      });
      audio1.addEventListener('ended',function(){
        audio2.play();
      });
      audio2.addEventListener('ended',function(){
        audio3.play();
      });
      audio3.addEventListener('ended',function(){
        audio4.play();
      });
      audio4.addEventListener('ended',function(){
        service.play();
      });
      service.addEventListener('ended',function(){
        audio5.play()
      });
      audio5.addEventListener('ended',function(){
        // updateQ(params)
      });
    }else{
      setTimeout(() => {
        updateQ(params)
      }, 8000);
    }
  }
 }
 const updateQ = (params: any) => {
  const dataSet = {
    id: params.id,
    status: 1,
    count: "",
  };
  dispatch(updateQueue(dataSet));
};


 
  return (
    <div>
      {queuereducer.showQueue && 
      <Dialog
      fullWidth={true}
      maxWidth="xl"
      open={queuereducer.modalCall}
      // onClose={handleClose}
    >
      {" "}
      <div style={{ textAlign: "center", paddingBottom: 20 }}>
        {/* <DialogTitle style={{ textAlign: "center" }}>
    โรงพยาบาลมะเร็งอุดรธานี
  </DialogTitle> */}
        <DialogContent style={{ textAlign: "center", color: "black" }}>
          {/* <DialogContentText > */}
            <img src="/src/assets/fulludch.png" width={450} />
            <Box>
            <Typography variant="h3" padding={2} fontWeight={800}>ขอเชิญหมายเลข</Typography>
            <Typography fontSize={240} fontWeight={800}>{queuereducer.showQueue.queue_no}</Typography>
            <Typography variant="h3" fontWeight={800}>ที่ชองบริการ : {queuereducer.showQueue.queue_type}</Typography>
            </Box>
            
          {/* </DialogContentText> */}
        </DialogContent>
      </div>
      {/* <DialogActions>
        <Button onClick={()=> dispatch(setModalCallQ(false))}>Close</Button>
      </DialogActions> */}
    </Dialog>
      }
      
    </div>
  );
};

export default CallAudio;
