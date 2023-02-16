import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import * as React from "react";
import "./Qtable.scss";
import dayjs from "dayjs";
import "dayjs/locale/th";

type Props = {
  typeData: any;
  queueData: string[];
  deleteQueue?: string;
  onUpdateStatus?: any;
};

const Qtable = (props: Props) => {
  return (
    <>
      <Typography
        sx={{ whiteSpace: "nowrap" }}
        padding={1}
        textAlign="center"
        variant="h5"
      >
        {props.typeData && props.typeData.name}
      </Typography>
      <Box
        sx={{
          whiteSpace: props.deleteQueue ? "" : "nowrap",
          overflow: props.deleteQueue ? "" : "hidden",
        }}
        height={props.deleteQueue ? "" : 237}
        width="100%"
        boxShadow={10}
        borderRadius={2}
      >
        <table>
          <tbody>
            <tr style={{ backgroundColor: props.typeData.color_btn }}>
              <th>
                <Typography textAlign="center" variant="h6">
                  ลำดับคิว
                </Typography>
              </th>
              <th>
                <Typography textAlign="center" variant="h6">
                  เวลากดคิว
                </Typography>
              </th>
              <th>
                <Typography textAlign="center" variant="h6">
                  วันที่
                </Typography>
              </th>
              {props.deleteQueue && (
                <th>
                  <Typography textAlign="center" variant="h6">
                    Action
                  </Typography>
                </th>
              )}
            </tr>
            {props.queueData &&
              props.queueData.map((val: any, key) => {
                return (
                  <tr key={key} >
                    <td>
                      <Typography textAlign="center" variant="h6">
                        {val.queue_no}
                      </Typography>
                    </td>
                    <td>
                      <Typography textAlign="center" variant="h6">
                        {props.deleteQueue ? val.time : val.check_in}
                      </Typography>
                    </td>
                    <td>
                      <Typography textAlign="center" variant="h6">
                        {props.deleteQueue ? dayjs(val.date).locale("th").format("DD/MM/YY") : dayjs(val.date).locale("th").format("DD MMMM YYYY")}
                      </Typography>
                    </td>
                    {props.deleteQueue && (
                      <td style={{textAlign : 'center'}}>
                        <Button onClick={()=>props.onUpdateStatus(val)} variant="contained" color={val.status == 0 ? 'error' : 'success'}>{val.status == 0 ? 'ยกเลิกคิว' : 'กลับรอคิว'}</Button>
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Box>
      {!props.deleteQueue && (
        <Typography
          sx={{ whiteSpace: "nowrap", marginTop: 2 }}
          padding={1}
          textAlign="center"
          variant="h5"
        >
          รอคิวทั้งหมด : {props.queueData && props.queueData.length}
        </Typography>
      )}
    </>
  );
};

export default Qtable;
