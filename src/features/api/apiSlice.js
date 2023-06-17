import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

export const APIURL = 'https://jsonplaceholder.typicode.com/';
export const API_KEY = '123';
const REQUEST_TIMEOUT = 50000;

// Define your initial state
const initialState = {
  token: '',
  isExpired: false,
  isSignOut: false,
};

// Create an async thunk for making GET requests
export const getCall = createAsyncThunk(
  'api/getCall',
  async ({ path, body = {}, headers = {}, showLoader = true, fallback = null }) => {
    const _axios = axios.create({
      baseURL: APIURL,
      headers: { apikey: API_KEY, ...headers },
      timeout: REQUEST_TIMEOUT,
    });

    let st = Date.now();
    try {
      if (showLoader) {
        // Dispatch an action to show loader
        // toggleLoader('show')
      }
      let resp = await _axios.get(path, body);
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );
      return { err, path, formatedTime, fallback };
    }
  }
);

// Create an async thunk for making PUT requests
export const putCall = createAsyncThunk(
  'api/putCall',
  async ({ path, body = {}, headers = {}, showLoader = true, fallback = null }) => {
    const _axios = axios.create({
      baseURL: APIURL,
      headers: { apikey: API_KEY, ...headers },
      timeout: REQUEST_TIMEOUT,
    });

    let st = Date.now();
    try {
      if (showLoader) {
        // Dispatch an action to show loader
        // toggleLoader('show')
      }
      let resp = await _axios.put(path, body);
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );
      return { err, path, formatedTime, fallback };
    }
  }
);

export const deleteCall = createAsyncThunk(
  'api/deleteCall',
  async ({ path, headers = {}, showLoader = true, fallback = null }) => {
    const _axios = axios.create({
      baseURL: APIURL,
      headers: { apikey: API_KEY, ...headers },
      timeout: REQUEST_TIMEOUT,
    });

    let st = Date.now();
    try {
      if (showLoader) {
        // Dispatch an action to show loader
        // toggleLoader('show')
      }
      let resp = await _axios.delete(path);
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? 'mm:ss SSS' : 'ss.SSS'
      );
      return { err, path, formatedTime, fallback };
    }
  }
);

// Create the API slice
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    isSignOut: (state) => {
      state.isSignOut = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCall.fulfilled, (state, action) => {
        // ... existing code ...
      })
      .addCase(getCall.rejected, (state, action) => {
        // ... existing code ...
      })
      .addCase(putCall.fulfilled, (state, action) => {
        // ... existing code ...
      })
      .addCase(putCall.rejected, (state, action) => {
        // ... existing code ...
      })
      .addCase(deleteCall.fulfilled, (state, action) => {
        const { resp, path, formatedTime, fallback } = action.payload;
        // Handle the response and update the state accordingly
        // ...
      })
      .addCase(deleteCall.rejected, (state, action) => {
        const { err, path, formatedTime, fallback } = action.payload;
        // Handle the error and update the state accordingly
        // ...
      });
  },
});

// Export the actions and reducer
export const { isSignOut } = apiSlice.actions;
export default apiSlice.reducer;