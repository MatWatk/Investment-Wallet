import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import languageSlice from './languageSlice';
import currencySlice from './currencySlice';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
        language: languageSlice,
        currency: currencySlice,
        authData: authSlice
    }
});

export { store };