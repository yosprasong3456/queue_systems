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
  modalCall: boolean;
  showQueue: any;
  isLoading: boolean
  queueDelete: string[]
}

const initialState: configState = {
  queueAll: [],
  queueRoom: [],
  modalPrint: false,
  dataPrint: "",
  isError: false,
  modalCall: false,
  showQueue: "",
  isLoading: false,
  queueDelete: []
};

export const getAllDelete = createAsyncThunk("queue/getAllDelete", async () => {
  const { data } = await axios.get(apiUrl + server.DELETE_QUEUE);
  if (data.message === "success") {
    return data.data;
  }
  throw Error();
});

export const cancelQueue = createAsyncThunk("queue/cancelQueue", async (params) => {
  const { data } = await axios.put(apiUrl + server.DELETE_QUEUE,params);
  if (data.message === "success") {
    const ressult = await axios.get(apiUrl + server.DELETE_QUEUE);
    return ressult.data.data;
  }
  throw Error();
});

export const getAllQueue = createAsyncThunk("queue/getAllQueue", async () => {
  const { data } = await axios.get(apiUrl + server.GET_QUEUE);
  if (data.message === "success") {
    return data.data;
  }
  throw Error();
});

export const getQueueOne = createAsyncThunk(
  "queue/getQueueOne",
  async (params: string) => {
    const { data } = await axios.get(
      apiUrl + server.GET_QUEUE + "?room=" + params
    );
    if (data.message === "success") {
      return data.data;
    }
    throw Error();
  }
);

export const insertQueue = createAsyncThunk(
  "queue/addQueue",
  async (params: any) => {
    const dataSet = {
      type: params.type,
    };
    const { data } = await axios.post(apiUrl + server.GET_QUEUE, dataSet);
    if (data.message === "success") {
      const setQueuePrint = {
        queue: data.data,
        type: params.typename,
        room: params.id,
      };
      // console.log(data.data);
      return setQueuePrint;
    }
    throw Error();
  }
);


export const updateQueue = createAsyncThunk(
  "queue/updateQueue",
  async (params: any) => {
    const { data } = await axios.put(apiUrl + server.GET_QUEUE, params);
    console.log(data)
    if (data.message === "success") {
      
      return ""
    }
    throw Error();
  }
);

export const backToWaitQueue = createAsyncThunk(
  "queue/bactToWaitQueue",
  async (params: any) => {
    const { data } = await axios.put(apiUrl + server.GET_QUEUE, params);
    console.log(data)
    if (data.message === "success") {
      
      return ""
    }
    throw Error();
  }
);

export const getCallQueue = createAsyncThunk("queue/getCallQueue", async () => {
  const { data } = await axios.get(apiUrl + server.CALL_QUEUE);
  if (data.message === "success") {
    return data.data;
  }
  throw Error();
});


const queueSlice = createSlice({
  name: "queueSlice",
  initialState: initialState,
  reducers: {
    setModalPrint: (state, action) => {
      state.modalPrint = action.payload;
    },
    setDataPrint: (state, action) => {
      state.dataPrint = action.payload;
    },
    setModalCallQ: (state, action) => {
      state.modalCall = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQueue.fulfilled, (state, action) => {
      state.queueAll = action.payload;
    });

    builder.addCase(getQueueOne.fulfilled, (state, action) => {
      state.queueRoom = action.payload;
    });

    builder.addCase(insertQueue.fulfilled, (state, action) => {
      state.modalPrint = true;
      state.dataPrint = action.payload;
    });

    builder.addCase(getCallQueue.fulfilled, (state, action) => {
      state.modalCall = true;
      state.showQueue = action.payload;
    });

    builder.addCase(getCallQueue.rejected, (state, action) => {
      state.modalCall = false;
      state.showQueue = '';
    });

    builder.addCase(updateQueue.fulfilled, (state, action) => {
      state.showQueue = "";
      state.modalCall = false;
    });
    builder.addCase(backToWaitQueue.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(backToWaitQueue.fulfilled, (state, action) => {
      state.showQueue = "";
      state.modalCall = false;
      state.isLoading = false
    });
    builder.addCase(getAllDelete.fulfilled, (state, action) => {
      state.queueDelete = action.payload
    });
    builder.addCase(cancelQueue.fulfilled, (state, action) => {
      state.queueDelete = action.payload
    });
  },
});

export const { setModalPrint, setDataPrint, setModalCallQ } = queueSlice.actions;
export const queueSelector = (store: RootState) => store.queueReducer;
export default queueSlice.reducer;
