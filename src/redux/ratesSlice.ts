import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const APIkey = "IBV3S7xWaZG0DNPjoAO2y9lGL372WNWl";


export const fetchRates = createAsyncThunk(
  'rates/fetchRates', 
  async () => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-0${date.getMonth()}-0${date.getDay()}`;

  let {data} = await axios.get(
      `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${currentDate}&end_date=${currentDate}`,
      { headers: { apikey: APIkey } }
    );
  return await data.rates[currentDate]
})

export const fetchInfoLoc = createAsyncThunk(
  'rates/fetchInfoLoc', 
  async () => {
    let {data} = await axios.get("https://ipapi.co/json/")     
  return await data.currency
})


export interface Irates{
  items:any,
  isLoading:boolean,
  currencyDefault:string
}
const initialState:Irates={
  items:[],
  isLoading:true,
  currencyDefault:""
}
export const ratesSlice = createSlice({
  name: 'rates',
  initialState: 
    initialState,
  reducers: {
  },
  extraReducers:(builder) => {
        builder.addCase(fetchRates.pending, (state) => {
          state.isLoading=false;
        })
        builder.addCase(fetchRates.fulfilled, (state,actions) => {
          state.items=actions.payload;          
          state.isLoading=true;
        })
        builder.addCase(fetchRates.rejected, (state,actions) => {
          state.isLoading=false;
        })
        builder.addCase(fetchInfoLoc.fulfilled, (state,actions) => {
          state.currencyDefault=actions.payload
        })
    }
})

export default ratesSlice.reducer