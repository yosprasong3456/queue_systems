import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { configSelector, getConfigs } from "../../store/slices/configSlice";
import { getAllQueue, queueSelector } from "../../store/slices/queueSlice";
import { useAppDispatch } from "../../store/store";

type Props = {};

const Rooms = (props: Props) => {
  const dispatch = useAppDispatch();
  const configReducer = useSelector(configSelector);
  const queueReducer = useSelector(queueSelector);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getConfigs()); // <-- (2) invoke on mount
    dispatch(getAllQueue());
    console.log(queueReducer.queueAll);
  }, [dispatch]);

  return (
    <Box textAlign="center">
      <Typography variant="h2" marginTop={6}>
        เลือกห้องบริการ
      </Typography>
      <Grid container spacing={2} marginTop={1}>
        {configReducer.menu &&
          configReducer.menu
            .filter((data: any) => data.id != "77" && data.actived != "0")
            .map((val: any, index) => {
              return (
                <Grid item xs key={index}>
                  <Box
                    onClick={() => navigate(`/room/${val.id}`)}
                    boxShadow={8}
                    minHeight={150}
                    padding={7}
                    margin={2.5}
                    sx={{ backgroundColor: val.color_btn, cursor: "pointer" }}
                  >
                    <Typography variant="h5">{val.name}</Typography>
                    <Divider />
                    <Typography variant="h5" margin={2.5}>
                      จำนวนที่รอคิว :{" "}
                      {
                        queueReducer.queueAll.filter(
                          (res: any) => res.queue_type == val.id
                        ).length
                      }
                    </Typography>
                  </Box>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};

export default Rooms;
