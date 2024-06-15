import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../../../backend/controllers/admin";

const initialState = {
    isAuthenticated: false,

}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state) => state.isAuthenticated = true,
        logout: (state) => state.isAuthenticated = false,
        
    }
})