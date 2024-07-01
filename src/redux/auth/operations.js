import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { errorToast, successToast } from "../../helpers/toast";

axios.defaults.baseURL = "https://webmail.swagger.epowhost.com:3443/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("auth/register", credentials);
      const response = await axios.post("auth/login", {
        email: credentials.email,
        password: credentials.password,
      });
      setAuthHeader(response.data.accessToken);
      return { data, accessToken: response.data.accessToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const logIn = createAsyncThunk(
//   "auth/login",
//   async (credentials, thunkAPI) => {
//     try {
//       const { data } = await axios.post("auth/login", credentials);
//       setAuthHeader(data.accessToken);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("auth/login", credentials);
      setAuthHeader(data.accessToken);
      // successToast("Successfully logged in"); //  повідомлення про успішний вхід
      return data;
    } catch (error) {
      switch (error.response?.status) {
        case 401:
          errorToast("Email or password is wrong");
          break;
        case 404:
          errorToast("User not found");
          break;
        default:
          errorToast(error.message);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("auth/logout");
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const { data } = await axios.get("users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "user/updateInfo",
  async (formData, thunkAPI) => {
    try {
      const res = await axios.patch("/users/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
