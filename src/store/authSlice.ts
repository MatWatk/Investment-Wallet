import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false, user: null },
    reducers: {
        setAuth: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
        }
    }
})

const authActions = authSlice.actions;

export default authSlice.reducer;
export { authActions };