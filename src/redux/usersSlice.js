import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const index = 'http://127.0.0.1:3000/users';
const show = 'http://127.0.0.1:3000/users/';
const create = 'http://127.0.0.1:3000/users';
const put = 'http://127.0.0.1:3000/users/';
const destroy = 'http://127.0.0.1:3000/users/';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async (_, { getState, rejectWithValue }) => {
      const state = getState();
      const url = index;
      const headers = { Accept: 'application/json', Authorization: state.admin.jwt };
      console.log(headers);
      const { status, data, message } = await axios.get(url, { headers }).catch((error) => error);
  
      if (status === 200) {
        return data;
      }
  
      return rejectWithValue(message);
    },
  );

  export const getDetails = createAsyncThunk(
    'users/getDetails',
    async (id, { getState, rejectWithValue }) => {
      const state = getState();
      const response = await axios
        .get(`${show}${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: state.admin.jwt,
          },
        })
        .catch((error) => error);
  
      if (response.status === 200) {
        return response.data;
      }
  
      return rejectWithValue(response.message);
    },
  );


  export const createUser = async (firstname, lastname, age, email, jwt) => {
    const body = {
      firstname,
      lastname,
      age,
      email,
    };
    const headers = {
      headers: {
        Authorization: jwt,
      },
    };
    const res = await axios.post(create, body, headers);
    return res;
  };

  export const deleteUser = createAsyncThunk(
    'users/delete',
    async (id, { getState, rejectWithValue }) => {
      const state = getState();
      const response = await axios
        .delete(`${destroy}${id}`, {
          headers: {
            Accept: 'application/json',
            Authorization: state.admin.jwt,
          },
        })
        .catch((error) => error);
  
      if (response.status === 200) {
        return [response.data, id];
      }
  
      return rejectWithValue(response.message);
    },
  );

    export const updateUser = async (id, firstname, lastname, age, email, jwt) => {
        const body = {
          firstname,
          lastname,
          age,
          email,
        };
        const headers = {
          headers: {
            Authorization: jwt,
          },
        };
        const res = await axios.put(`${put}${id}`, body, headers);
        return res;
      };

const usersSlice = createSlice({
    name: 'users',
    initialState: {},
    reducers: {
      clearDetails: (state) => {
        state.details = null;
      },
    },
    extraReducers: {
      [getDetails.fulfilled]: (state, { payload }) => {
        state.details = payload;
        state.detailsError = null;
      },
      [getDetails.rejected]: (state, action) => {
        state.detailsError = action.payload;
      },
      [deleteUser.fulfilled]: (state, { payload }) => {
        const [data, id] = payload;
        state.all = state.all.filter((user) => user.id !== id);
        state.message = data.message;
        state.error = null;
      },
      [deleteUser.rejected]: (state, { payload }) => {
        state.deleteError = payload;
      },
      [getUsers.fulfilled]: (state, { payload }) => {
        state.all = payload;
        state.allError = null;
      },
      [getUsers.rejected]: (state, { payload }) => {
        state.allError = payload;
      },
    },
  });

    export const { clearDetails } = usersSlice.actions;
    export default usersSlice.reducer;