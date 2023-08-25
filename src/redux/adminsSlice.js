import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const singin = 'http://127.0.0.1:3000/admins/sign_in';

const singout = 'http://127.0.0.1:3000/admins/sign_out';


export const login = createAsyncThunk('admins/login', async ( {email, password}, { rejectWithValue }) => {
    const data = { headers: {Accept: 'application/json'}, admin: {email, password} };
    const response = await axios.post(singin, data).catch((error) => error);
    console.log(response);
    if (response.status === 200) {
        return [response.data, response.headers.authorization];
    }
    return rejectWithValue(response.response.data.message);
},
);

export const logout = createAsyncThunk('admins/logout', async (_, { getState }) => {
    const state = getState();
    const url = singout;
    const headers = { Accept: 'application/json', Authorization: state.admin.jwt };
    console.log(headers);
    const response = await axios.delete(url, { headers }).catch((error) => error);
  
    if (response.status === 200) {
      return response.data;
    }
  
    return response.message;
  });

const adminsSlice = createSlice({
    name: 'admins',
    initialState: {},
    reducers: {
        setLocalStorageAdminData: (state) => {
          const localStorageAdminData = localStorage.getItem('admin');
          if (localStorageAdminData) {
            const [adminData, jwt] = JSON.parse(localStorageAdminData);
            state.admin = adminData.admin;
            state.jwt = jwt;
          } else {
            state.admin = null;
          }
        },
      },
      extraReducers: {
        [login.fulfilled]: (state, { payload }) => {
          localStorage.setItem('admin', JSON.stringify(payload));
          const [adminData, jwt] = payload;
          state.admin = adminData.admin;
          state.jwt = jwt;
          console.log(state.jwt);
          state.loginLoading = false;
          state.loginError = null;
        },
        [login.pending]: (state) => {
          state.loginLoading = true;
        },
        [login.rejected]: (state, { payload }) => {
          state.loginLoading = false;
          state.loginError = payload;
        },
        [logout.fulfilled]: (state) => {
          localStorage.removeItem('admin');
          state.admin = null;
          state.jwt = null;
          state.logoutError = null;
        },
        [logout.rejected]: (state, { payload }) => {
          state.logoutError = payload;
        },
      },
});

export const { setLocalStorageAdminData } = adminsSlice.actions;

export default adminsSlice.reducer;

