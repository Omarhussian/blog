import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
import { createAction } from "@reduxjs/toolkit";

export const updateBlogs = createAction("api/updateBlogs");
export const deleteBlog = createAction("api/deleteBlog");

export const APIURL = "https://jsonplaceholder.typicode.com/";
export const API_KEY = "123";
const REQUEST_TIMEOUT = 50000;

const initialState = {
  // token: "",
  isExpired: false,
  isSignOut: false,
  data: [],
};
export const postCall = createAsyncThunk(
  "api/postCall",
  async ({
    path,
    body = {},
    headers = {},
    showLoader = true,
    fallback = null,
  }) => {
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
      let resp = await _axios.post(path, body);
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );
      return { err, path, formatedTime, fallback };
    }
  }
);
// Create an async thunk for making GET requests
export const getCall = createAsyncThunk(
  "api/getCall",
  async ({
    path,
    body = {},
    headers = {},
    showLoader = true,
    fallback = null,
  }) => {
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
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );
      return { err, path, formatedTime, fallback };
    }
  }
);

// Create an async thunk for making PUT requests
export const putCall = createAsyncThunk(
  "api/putCall",
  async ({
    path,
    body = {},
    headers = {},
    showLoader = true,
    fallback = null,
  }) => {
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
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );
      return { err, path, formatedTime, fallback };
    }
  }
);

export const deleteCall = createAsyncThunk(
  "api/deleteCall",
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
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );

      return { resp, path, formatedTime, fallback };
    } catch (err) {
      let time = Date.now() - st;
      let formatedTime = moment(moment.utc(time)).format(
        time > 60 * 1000 ? "mm:ss SSS" : "ss.SSS"
      );
      return { err, path, formatedTime, fallback };
    }
  },
  {
    // Add this option to handle the 404 error gracefully
    rejectWithValue: (error) => {
      return error.response ? error.response.data : error.message;
    },
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    isSignOut: (state) => {
      state.isSignOut = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCall.fulfilled, (state, action) => {
        const { resp } = action.payload;
        if (resp && resp.status === 201) {
          const newBlog = resp.data;
          state.data.push(newBlog);
        }
      })
      .addCase(postCall.rejected, (state, action) => {
        const error = action.payload;
      })
      .addCase(updateBlogs, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getCall.rejected, (state, action) => {
        const { resp } = action.payload;
        state.data = resp.data;
        state.isLoading = false;
      })

      .addCase(putCall.fulfilled, (state, action) => {
        const { resp } = action.payload;
        if (resp && resp.status === 200) {
          const editedBlog = resp.data;
          const blogIndex = state.data.findIndex(
            (blog) => blog.id === editedBlog.id
          );
          if (blogIndex !== -1) {
            state.data[blogIndex] = editedBlog;
          }
        }
      })
      .addCase(putCall.rejected, (state, action) => {
        const error = action.payload;
      })
      .addCase(deleteCall.fulfilled, (state, action) => {
        const { resp } = action.payload;
        if (resp && resp.status === 200) {
          const blogId = parseInt(action.meta.arg.path.split("/").pop());
          state.data = state.data.filter((blog) => blog.id !== blogId);
        }
      })
      .addCase(deleteCall.rejected, (state, action) => {
        const error = action.payload;
      });
  },
});

export const { isSignOut } = apiSlice.actions;
export default apiSlice.reducer;
