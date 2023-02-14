import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { configSelector, getConfigs } from "../../store/slices/configSlice";
import { useAppDispatch } from "../../store/store";

type Props = {};

const Rooms = (props: Props) => {
  const dispatch = useAppDispatch();
  const configReducer = useSelector(configSelector);
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(getConfigs()); // <-- (2) invoke on mount
  }, [dispatch]);

  return (
    <Box textAlign="center">
      <Typography variant="h2" marginTop={6}>
        เลือกห้องบริการ
      </Typography>
      {configReducer.menu &&
        configReducer.menu
          .filter((data: any) => data.id != "77" || data.actived != "0")
          .map((val: any, index) => {
            return (
              <Typography
                onClick={()=> navigate(`/room/${val.id}`)}
                boxShadow={3}
                variant="h5"
                padding={7}
                margin={2.5}
                key={index}
                sx={{ backgroundColor: val.color_btn, cursor: "pointer" }}
              >
                {val.name}
              </Typography>
            );
          })}
    </Box>
  );
};

export default Rooms;
