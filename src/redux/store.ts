
import { configureStore } from "@reduxjs/toolkit";
import ratesSlice from "./ratesSlice";



export const store =  configureStore({
    reducer: {
        rates: ratesSlice
    }
  })
 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
