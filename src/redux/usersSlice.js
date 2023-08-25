import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const singin = 'http://127.0.0.1:3000/users/sign_in';

const singout = 'http://127.0.0.1:3000/users/sign_out';

const initialState = {
    user: null,
    status: 'idle',
    error: null
};

export const singinUser = createAsyncThunk('users/login', async ( {email, password}, { rejectWithValue }) => {
    const data = { headers: {Accept: 'application/json'}, user: {email, password} };
    const response = await axios.post(singin, data).catch((error) => error);

    if (response.status === 200) {
        return [response.data, response.headers.authorization];
    }
    return rejectWithValue(response.response.data.message);
},
);

export const singoutUser = createAsyncThunk('users/logout', async (_, { getState }) => {
    const state = getState();
    const url = singout;
    const headers = { Accept: 'application/json', Authorization: state.user.jwt };
    const response = await axios.delete(url, { headers }).catch((error) => error);
  
    if (response.status === 200) {
      return response.data;
    }
  
    return response.message;
  });

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [singinUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [singinUser.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.user = action.payload;
        },
        [singinUser.rejected]: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        [singoutUser.pending]: (state, action) => {
            state.status = 'loading';
        }
    }
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;

