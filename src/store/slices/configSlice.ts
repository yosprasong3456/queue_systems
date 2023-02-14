

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, server } from "../../constants";
import { RootState } from "../store";

export interface configState {
    menu: string[]
    isError : boolean
}

const initialState: configState = {
  menu: [],
  isError: false,
};

export const getConfigs = createAsyncThunk("menu/getAll", async () => {
    const {data} = await axios.get(apiUrl + server.CONFIG)
    if(data.message === "success"){
      return data.data
    }
    throw Error();
});

const  configSlice = createSlice({
  name: "configSlice",
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getConfigs.fulfilled, (state, action) => {
        state.menu = action.payload;
    })
  },
});

export const { } = configSlice.actions;
export const configSelector = (store: RootState) => store.configReducer;
export default configSlice.reducer;
