import { Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { configSelector, getConfigs } from '../../store/slices/configSlice';
import { cancelQueue, getAllDelete, queueSelector } from '../../store/slices/queueSlice';
import { useAppDispatch } from '../../store/store';
import Qtable from '../Qtable';

type Props = {}

function AdminDelete({}: Props) {
  const configReducer = useSelector(configSelector);
  const queuereducer = useSelector(queueSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllDelete())
    dispatch(getConfigs())
  }, [dispatch])
  
  const onUpdateStatus = (params:any) => {
    const dataSet = {
      id : params.id,
      status : params.status == 0 ? '3' : '0'
    }
    dispatch(cancelQueue(dataSet))
  }
  return (
    <div>{configReducer && 
      <Grid container spacing={2} marginTop={2}>
         {configReducer.menu.filter((data : any)=> data.id != '77').map((val:any, index: number) => {
        return (
          <Grid item xs key={index}>
            <Qtable deleteQueue='1' onUpdateStatus={onUpdateStatus} queueData={queuereducer.queueDelete.filter((data: any) => data.queue_type == val.id)} typeData={val} />
          </Grid>
        )
      })}
      </Grid>
     
      
    }</div>
  )
}

export default AdminDelete