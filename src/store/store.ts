import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import queueReducer from "./slices/queueSlice";

const reducer = { queueReducer };

export const store = configureStore({
  reducer,
  devTools: import.meta.env.VITE_IS_PRODUCTION === "0", // show redux log in dev mode
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
