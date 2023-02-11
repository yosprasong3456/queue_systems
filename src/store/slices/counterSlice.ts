import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type stateProp = {
  count: number;
};
const defaultState: stateProp = { count: 0 };

export const addAsync = createAsyncThunk("counter/addAsync", async () => {
  // do something such as connecting server to feed something
  // simulate such task with settimeout
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

export const removeAsync = createAsyncThunk("counter/removeAsync", async () => {
  // do something such as connecting server to feed something
  // simulate such task with settimeout
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

export const resetAsync = createAsyncThunk(
  "counter/resetAsync",
  async (value: number) => {
    // do something such as connecting server to feed something
    // simulate such task with settimeout
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return value;
  }
);

const counterSlice = createSlice({
  name: "counter",
  initialState: defaultState,
  reducers: {
    add: (state) => {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      state.count = state.count + 1;
    },
    remove: (state) => {
      state.count = state.count - 1;
    },
  },
  extraReducers: (builder) => {
    // addAsync
    builder.addCase(addAsync.fulfilled, (state, action) => {
      state.count = state.count + 1;
    });
    // removeAsync
    builder.addCase(removeAsync.fulfilled, (state, action) => {
      state.count = state.count - 1;
    });
    // resetAsync
    builder.addCase(resetAsync.fulfilled, (state, action) => {
      state.count = action.payload;
    });
  },
});

export const { add, remove } = counterSlice.actions;
export default counterSlice.reducer;
export const counterSelector = (state: RootState) => state.counterReducer;
