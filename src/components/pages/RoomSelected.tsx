import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { apiUrl } from "../../constants";
import { configSelector, getConfigs } from "../../store/slices/configSlice";
import { getAllQueue, getQueueOne, queueSelector } from "../../store/slices/queueSlice";
import { useAppDispatch } from "../../store/store";
import CallQtable from "../CallQtable";

type Props = {};

const RoomSelected = (props: Props) => {
  const match: any = useMatch("/room/:id");
  const queuereducer = useSelector(queueSelector);
  const dispatch = useAppDispatch();
  const configReducer = useSelector(configSelector);
  const [calledQ, setCalledQ] = useState(null);
  const [callWait, setCallWait] = useState(null);

  // const filterMenu = () => {
    
  //   return result[0];
  // };

  useEffect(() => {
    dispatch(getAllQueue());
    dispatch(getConfigs());
    dispatch(getQueueOne(match.params.id))
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(queuereducer.queueRoom)
      dispatch(getQueueOne(match.params.id))
    }, 3000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // const getAll = async () => {
  //   const { data } = await axios.get(
  //     `${apiUrl}/opdQueue.php?room=${match.params.id}`
  //   );
  //   console.log(data)
  //   if (data.message === "success") {
  //     let countRow = data.data.length;
  //     let result_called = data.data.filter(
  //       (data : any) => data.status == 1 || data.status == 2
  //     );
  //     let result_wait = data.data.filter((data : any) => data.status == 0);
  //     setCalledQ(
  //       result_called.sort(function (a :any, b : any) {
  //         return b.queue_no - a.queue_no;
  //       })
  //     );
  //     setCallWait(result_wait);
  //     console.log(result_wait);
  //     // setCount(countRow);
  //     return;
  //   } else {
  //     return;
  //   }
  // };

 


  return (
    <Box textAlign="center" marginTop={3}>
      {configReducer.menu.length && configReducer.menu.filter((data : any)=> data.id == match.params.id).map((val : any,index)=> 
     <Typography variant="h4" key={index}>{val.name}</Typography>
      
      )}
      <Box marginTop={1}>
        <Button variant="contained" sx={{ padding: 2, marginTop: 2 }}>
          เรียกคิว
        </Button>
         <Grid container spacing={2} marginTop={1}>
        <Grid item xs>
          {queuereducer.queueRoom.length && (
            <CallQtable
              queueData={queuereducer.queueRoom.filter((data: any)=> data.status == '0')}
              btnRecall=""
            />
          )}
        </Grid>

        <Grid item xs>
          {queuereducer.queueRoom.length && (
            <CallQtable
            queueData={queuereducer.queueRoom.filter((data: any)=> data.status != '0')}
            btnRecall="เรียกซ้ำ"
            />
          )}
        </Grid>
        </Grid>
        
      </Box>
    </Box>
  );
};

export default RoomSelected;
