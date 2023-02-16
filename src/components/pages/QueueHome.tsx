import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  Grid,
  Paper,
  Snackbar,
} from "@mui/material";
import { useAppDispatch } from "../../store/store";
import { configSelector, getConfigs } from "../../store/slices/configSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { apiUrl, server } from "../../constants";
import {
  getAllQueue,
  insertQueue,
  queueSelector,
  setDataPrint,
  setModalPrint,
} from "../../store/slices/queueSlice";
import PrintQ from "../PrintQ";

type Props = {};

const QueueHome = (props: Props) => {
  const configReducer = useSelector(configSelector);
  const queuereducer = useSelector(queueSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getConfigs());
  }, [dispatch]);

  const addQueue = async (params: string, name: string, id: string) => {
    const data = {
      type : params,
      typename : name,
      id : id
    }
    dispatch(getAllQueue());
    dispatch(insertQueue(data));
  };
  return (
    <Box textAlign="center" margin="auto" width="60%">
      <Box marginTop={8} />
      {configReducer.menu &&
        configReducer.menu
          .filter((data: any) => data.id != "77" && data.actived != "0")
          .map((val: any, index) => {
            return (
              <Box
                key={index}
                sx={{
                  marginTop: 5,
                  backgroundColor: val.color_btn,
                  cursor: "pointer",
                  borderRadius: 5
                }}
                boxShadow={3}
                onClick={() => addQueue(val.id, val.name, val.id)}
              >
                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <Typography
                      padding={6}
                      paddingBottom={7}
                      variant="h4"
                      marginLeft={4}
                    >
                      {val.name}{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <img
                      src="click.gif"
                      width={80}
                      style={{ marginTop: 15 }}
                    />
                  </Grid>
                </Grid>
              </Box>
              // </Box>
            );
          })}
      {queuereducer.dataPrint && <PrintQ />}
    </Box>
  );
};

export default QueueHome;
