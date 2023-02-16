import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl, server } from "../../constants";
import { RootState } from "../store";

export interface configState {
  menu: string[];
  soundConfig: any;
  isError: boolean;
}

const initialState: configState = {
  menu: [],
  soundConfig: "",
  isError: false,
};

export const getConfigs = createAsyncThunk("menu/getAll", async () => {
  const { data } = await axios.get(apiUrl + server.CONFIG);
  if (data.message === "success") {
    return data.data;
  }
  throw Error();
});

export const updateActived = createAsyncThunk("menu/updateActived", async (params: any) => {
  const { data } = await axios.put(apiUrl + server.CONFIG, params);
  console.log(data)
  if (data.message === "success") {
    const getMenu = await axios.get(apiUrl + server.CONFIG);
    console.log(getMenu.data.data)
    return getMenu.data.data;
  }
  throw Error();
});

export const updateMenuName = createAsyncThunk("menu/updateMenuName", async (params: any) => {
  const { data } = await axios.post(apiUrl + server.CONFIG, params);
  console.log(data)
  if (data.message === "success") {
    const getMenu = await axios.get(apiUrl + server.CONFIG);
    console.log(getMenu.data.data)
    return getMenu.data.data;
  }
  throw Error();
});
export const getConfigSound = createAsyncThunk(
  "menu/getConfigSound",
  async () => {
    const { data } = await axios.get(apiUrl + server.CONFIG);
    if (data.message === "success") {
      let result = data.data.find((val: any) => val.id == "77");
      // console.log(result)
      return result
    }
    throw Error();
  }
);
const configSlice = createSlice({
  name: "configSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getConfigs.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
    builder.addCase(getConfigSound.fulfilled, (state, action) => {
      state.soundConfig = action.payload;
    });
    builder.addCase(updateActived.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
    builder.addCase(updateMenuName.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
  },
});

export const {} = configSlice.actions;
export const configSelector = (store: RootState) => store.configReducer;
export default configSlice.reducer;
