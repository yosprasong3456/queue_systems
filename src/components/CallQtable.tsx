import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import "dayjs/locale/th";
import "./Qtable.scss";

type Props = {
  queueData: any;
  btnRecall: any;
  btnCallQueue: any;
  btnBackQueue?: any;
};

const CallQtable = (props: Props) => {
  return (
    <Box width="100%" boxShadow={10} borderRadius={2}>
      <table>
        <tbody>
          <tr>
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
            <th>
              <Typography textAlign="center" variant="h6">
                Action
              </Typography>
            </th>
          </tr>
          {props.queueData &&
            props.queueData.map((val: any, key: string) => {
              return (
                <tr key={key}>
                  <td>
                    <Typography textAlign="center" variant="h6">
                      {val.queue_no}
                    </Typography>
                  </td>
                  <td>
                    <Typography textAlign="center" variant="h6">
                      {val.check_in}
                    </Typography>
                  </td>
                  <td>
                    <Typography textAlign="center" variant="h6">
                      {dayjs(val.date).locale("th").format("DD MMMM YYYY")}
                    </Typography>
                  </td>
                  <td style={{textAlign : 'center'}}>
                    <Button
                      onClick={() => props.btnCallQueue(val)}
                      variant="contained"
                      disabled={val.count > 2 ? true : false}
                    >
                      {props.btnRecall
                        ? props.btnRecall + " (" + val.count + ")"
                        : "เรียกคิว"}
                        
                    </Button>
                      { props.btnBackQueue && <Button
                      color="warning"
                      
                      style={{marginLeft: 7}}
                      onClick={() => props.btnBackQueue(val)}
                      variant="contained"
                      disabled={val.count > 2 ? true : false}
                    >
                      กลับรอคิว
                    </Button>}
                    
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </Box>
  );
};

export default CallQtable;
