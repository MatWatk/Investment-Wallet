import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import languageSlice from './languageSlice';
import currencySlice from './currencySlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        language: languageSlice,
        currency: currencySlice
    }
});

export { store };