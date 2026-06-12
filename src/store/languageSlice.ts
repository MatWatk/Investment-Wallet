import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
    name: 'language',
    initialState: { language: 'english' },
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
        }
    }
})

const languageActions = languageSlice.actions;

export default languageSlice.reducer;
export { languageActions };