

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
 
}

const initialState: AuthState = {
  queueNo: '',
  isLoading: false,
  isError: false,
};

const  queueSlice = createSlice({
  name: "queueSlice",
  initialState: initialState,
  reducers: {
   
  },
  extraReducers: () => {
  },
});

export const { } = queueSlice.actions;
export const queueSelector = (store: RootState) => store.queueReducer;
export default queueSlice.reducer;
