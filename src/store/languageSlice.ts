import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SupportedLanguage } from "../types/types";

const initialState: { language: SupportedLanguage } = { language: "english" };

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
            state.language = action.payload;
        }
    }
})

const languageActions = languageSlice.actions;

export default languageSlice.reducer;
export { languageActions };