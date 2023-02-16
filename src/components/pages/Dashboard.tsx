import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { configSelector, getConfigs, getConfigSound } from "../../store/slices/configSlice";
import { getAllQueue, getCallQueue, queueSelector } from "../../store/slices/queueSlice";
import { useAppDispatch } from "../../store/store";
import CallAudio from "../CallAudio";
import Qtable from "../Qtable";

type Props = {};

const Dashboard = (props: Props) => {
  const [time, setTime] = useState(getTime());
  const configReducer = useSelector(configSelector);
  const queuereducer = useSelector(queueSelector);
  const [menu, setMenu] = useState([])
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConfigs());
    dispatch(getAllQueue())
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
        dispatch(getCallQueue());
      // }
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch, queuereducer.modalCall, queuereducer.showQueue]);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('getQ')
      dispatch(getAllQueue()); // <-- (3) invoke in interval callback
      dispatch(getConfigSound());
    }, 10000);
    dispatch(getConfigSound());
    dispatch(getAllQueue()); // <-- (2) invoke on mount
  
    return () => clearInterval(id);
    
  }, [dispatch]);

  useEffect(() => {
    if(configReducer.menu){
      let result : any = configReducer.menu.filter((data : any)=> data.id != '77' && data.actived != '0')
      console.log(queuereducer.queueAll)
      setMenu(result)
    }
  }, [configReducer]);

  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);
  
  return (
    <div>
      <Typography variant="h3" margin={1} padding={1} textAlign="center" display={{ md: 'none', lg: 'block', sm: 'none', xs: 'none' }}>Dashboard Queue</Typography>
      <Typography variant="h1" margin={1} padding={1} textAlign="center" display={{ md: 'none', lg: 'block', sm: 'none', xs: 'none'}}><div className="clock-wrapper">
        <span>{time.slice(0, 2)}</span>
        <span>:</span>
        <span>{`${time.slice(3, 6)}`}</span>
      </div></Typography>
      <Grid container spacing={2} marginTop={1}>
      {menu &&
          menu.map((result: any, index: number) => {
            return (
              <Grid item xs key={index}>
                <Qtable typeData={result} queueData={queuereducer.queueAll.filter((data : any)=> data.queue_type == result.id)}/>
              </Grid>
            );
          })}
      </Grid>
      <CallAudio dashboard="1" soundConfig={configReducer.soundConfig.actived}/>
    </div>
  );
};

function getTime() {
  const d = new Date();
  const hour = d.getHours();
  const min = d.getMinutes();
  let result_min;
  let result_hour;
  if (hour < 10) {
    result_hour = `0${hour}`;
  } else {
    result_hour = hour;
  }
  if (min < 10) {
    result_min = `0${min}`;
  } else {
    result_min = min;
  }
  return `${result_hour}:${result_min}`;
}

export default Dashboard;
