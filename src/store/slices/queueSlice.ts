import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, server } from "../../constants";
import { RootState } from "../store";

export interface configState {
  queueAll: string[];
  queueRoom: string[];
  modalPrint: boolean;
  dataPrint: any;
  isError: boolean;
}

const initialState: configState = {
  queueAll: [],
  queueRoom : [],
  modalPrint: false,
  dataPrint: "",
  isError: false,
};

export const getAllQueue = createAsyncThunk("queue/getAllQueue", async () => {
  const { data } = await axios.get(apiUrl + server.GET_QUEUE);
  if (data.message === "success") {
    return data.data;
  }
  throw Error();
});

export const getQueueOne = createAsyncThunk("queue/getQueueOne", async (params : string) => {
    const { data } = await axios.get(apiUrl + server.GET_QUEUE + '?room=' + params);
    if (data.message === "success") {
      console.log(data.data)
      return data.data;
    }
    throw Error();
});


const queueSlice = createSlice({
  name: "queueSlice",
  initialState: initialState,
  reducers: {
    setModalPrint: (state, action) => {
      state.modalPrint = action.payload
    },
    setDataPrint: (state, action) => {
      state.dataPrint = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQueue.fulfilled, (state, action) => {
        state.queueAll = action.payload;
    })

    builder.addCase(getQueueOne.fulfilled, (state, action) => {
      state.queueRoom = action.payload;
    });
  },
});

export const {setModalPrint,setDataPrint} = queueSlice.actions;
export const queueSelector = (store: RootState) => store.queueReducer;
export default queueSlice.reducer;
