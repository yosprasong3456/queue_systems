import React, { useEffect, useState } from "react";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { useSelector } from "react-redux";
import {
  getAllQueue,
  queueSelector,
  setDataPrint,
  setModalPrint,
} from "../store/slices/queueSlice";
import { useAppDispatch } from "../store/store";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  Divider,
  Typography,
} from "@mui/material";
type Props = {};

function PrintQ({}: Props) {
  const queuereducer = useSelector(queueSelector);
  const dispatch = useAppDispatch();
  const componentRef : any = React.useRef();
  const [date, setDate] : any = useState(null);
  const [time, setTime] : any = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Queue",
    onAfterPrint: () => handleClosePrint(),
  });

  function handleClosePrint() {
    setTime(null);
    setDate(null);
    dispatch(setModalPrint(false));
    dispatch(setDataPrint(""));
    dispatch(getAllQueue());
  }

  useEffect(() => {
    const date : any = new Date();
    let hour : any = date.getHours();
    let minutes : any = date.getMinutes();
    let mount : any = parseInt(date.getMonth() + 1)
    if (hour < 10) {
      hour = "0" + date.getHours();
    }
    if (minutes < 10) {
      minutes = "0" + date.getMinutes();
    }
    setTime(`${hour}:${minutes}`);
    setDate(
      dayjs(`${date.getFullYear()}-${mount}-${date.getDate()}`)
        .locale("th")
        .add(543, "year")
        .format("DD MMMM YYYY")
    );
      setTimeout(() => {
        if(queuereducer.dataPrint){
          handlePrint()
        }
      }, 1000);
  }, []);

  return (
    <div>
      {queuereducer.dataPrint && (
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={queuereducer.modalPrint}
          // onClose={handleClose}
        >
          {" "}
          <div
            ref={componentRef}
            style={{ textAlign: "center", paddingBottom: 20 }}
          >
            {/* <DialogTitle style={{ textAlign: "center" }}>
            โรงพยาบาลมะเร็งอุดรธานี
          </DialogTitle> */}
            <DialogContent>
              <DialogContentText
                style={{ textAlign: "center", color: "black" }}
              >
                <img src="/src/assets/fulludch.png" width={180} />
                {/* <Typography>โรงพยาบาลมะเร็งอุดรธานี</Typography> */}
                <Divider />
                <Typography marginTop={1}>{queuereducer.dataPrint.type}</Typography>
                <Typography>ช่องบริการ : {queuereducer.dataPrint.room}</Typography>

                <Typography variant="h2" fontWeight={800}>
                  {queuereducer.dataPrint.queue}
                </Typography>
                <Typography>{time && time}</Typography>
                <Typography>{date && date}</Typography>
                <Typography>จำนวนที่รอ {queuereducer.queueAll.filter((data : any)=> data.queue_type == queuereducer.dataPrint.room).length} คิว</Typography>
              </DialogContentText>
            </DialogContent>
          </div>
          {/* <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions> */}
        </Dialog>
      )}
    </div>
  );
}

export default PrintQ;
