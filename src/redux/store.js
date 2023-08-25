import { configureStore } from '@reduxjs/toolkit';
import adminsSlice from './adminsSlice';
import usersSlice from './usersSlice';

const reducer = {
    admin: adminsSlice,
    users: usersSlice,
};

const setupStore = (preloadedState) => configureStore({
    preloadedState,
    reducer,
});

export const selectJWT = (state) => state.admin.jwt;
export const selectAdmin = (state) => state.admin.admin;
export const selectAdminLoginLoading = (state) => state.admin.loginLoading;
export const selectAdminLoginError = (state) => state.admin.loginError;
export const selectAdminLogoutError = (state) => state.admin.logoutError;
export const selectUsers = (state) => state.users.all;
export const selectUsersError = (state) => state.users.allError;
export const selectUsersDetails = (state) => state.users.details;
export const selectUsersDetailsError = (state) => state.users.detailsError;
export const selectUsersDeleteError = (state) => state.users.deleteError;
export const selectUsersDeleteMessage = (state) => state.users.deleteMessage;


export default setupStore;