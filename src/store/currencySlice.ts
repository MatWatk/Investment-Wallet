import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
    name: 'currency',
    initialState: { currency: 'USD' },
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        }
    }
})

const currencyActions = currencySlice.actions;

export default currencySlice.reducer;
export { currencyActions };