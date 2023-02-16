import { Backdrop, Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { apiUrl } from "../../constants";
import {
  configSelector,
  getConfigs,
  getConfigSound,
} from "../../store/slices/configSlice";
import {
  backToWaitQueue,
  getAllQueue,
  getCallQueue,
  getQueueOne,
  queueSelector,
  setModalCallQ,
  updateQueue,
} from "../../store/slices/queueSlice";
import { useAppDispatch } from "../../store/store";
import CallAudio from "../CallAudio";
import CallQtable from "../CallQtable";

type Props = {};

const RoomSelected = (props: Props) => {
  const match: any = useMatch("/room/:id");
  const queuereducer = useSelector(queueSelector);
  const dispatch = useAppDispatch();
  const configReducer = useSelector(configSelector);

  useEffect(() => {
    dispatch(getAllQueue());
    dispatch(getConfigs());
    dispatch(getQueueOne(match.params.id));
    dispatch(getConfigSound());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getQueueOne(match.params.id));
      // if (!queuereducer.modalCall) {
      dispatch(getCallQueue());
      // }
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch, queuereducer.modalCall, queuereducer.showQueue]);

  const nameMenu = () => {
    const res: any = configReducer.menu.find(
      (data: any) => data.id == match.params.id
    );
    return res.name;
  };

  const startAudio = (params: any = 0) => {
    if (params) {
      if (configReducer.soundConfig.actived == "0") {
        console.log('sound = 0')
        const audio = new Audio("/public/audio/call.mp3");
        const audio1 = new Audio(`/public/audio/${params.queue_no.charAt(0)}.mp3`);
        const audio2 = new Audio(`/public/audio/${params.queue_no.charAt(1)}.mp3`);
        const audio3 = new Audio(`/public/audio/${params.queue_no.charAt(2)}.mp3`);
        const audio4 = new Audio(`/public/audio/${params.queue_no.charAt(3)}.mp3`);
        const audio5 = new Audio(`/public/audio/${params.queue_type}.mp3`);
        const service = new Audio(`/public/audio/service.mp3`);

        audio.play();
        audio.addEventListener("ended", function () {
          audio1.play();
        });
        audio1.addEventListener("ended", function () {
          audio2.play();
        });
        audio2.addEventListener("ended", function () {
          audio3.play();
        });
        audio3.addEventListener("ended", function () {
          audio4.play();
        });
        audio4.addEventListener("ended", function () {
          service.play();
        });
        service.addEventListener("ended", function () {
          audio5.play();
        });
        audio5.addEventListener("ended", function () {
          updateQ(params);
        });
      }
    }
  };
  const updateQ = (params: any) => {
    const dataSet = {
      id: params.id,
      status: 1,
      count: "",
    };
    dispatch(updateQueue(dataSet));
  };

  const CallQ = (params: any) => {
    const dataSet = {
      id: params.id,
      status: 2,
      count: parseInt(params.count) + 1,
    };
    dispatch(updateQueue(dataSet));
    startAudio(params);
  };

  const backQueue = (params: any) => {
    const dataSet = {
      id: params.id,
      status: 0,
      count: parseInt(params.count),
    };
    dispatch(backToWaitQueue(dataSet));
    dispatch(getAllQueue());
  };
  return (
    <Box textAlign="center" marginTop={3}>
      {configReducer.menu.length && (
        <Typography variant="h4">{nameMenu()}</Typography>
      )}
      <Box marginTop={1}>
        <Button
          onClick={() => dispatch(setModalCallQ(false))}
          variant="contained"
          sx={{ padding: 2, marginTop: 2 }}
        >
          เรียกคิว
        </Button>
        <Grid container spacing={2} marginTop={1}>
          <Grid item xs>
            {queuereducer.queueRoom.length && (
              <CallQtable
                queueData={queuereducer.queueRoom.filter(
                  (data: any) => data.status == "0"
                )}
                btnRecall=""
                btnCallQueue={CallQ}
              />
            )}
          </Grid>

          <Grid item xs>
            {queuereducer.queueRoom.length && (
              <CallQtable
                queueData={queuereducer.queueRoom
                  .filter((data: any) => data.status != "0")
                  .sort(function (a: any, b: any) {
                    return b.queue_no - a.queue_no;
                  })}
                btnRecall="เรียกซ้ำ"
                btnCallQueue={CallQ}
                btnBackQueue={backQueue}
              />
            )}
          </Grid>
        </Grid>
      </Box>
      <CallAudio />
    </Box>
  );
};

export default RoomSelected;
