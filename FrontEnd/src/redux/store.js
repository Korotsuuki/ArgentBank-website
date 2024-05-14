import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; /* localStorage par défaut */
import loginSlice from "./loginSlice.js";


const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, loginSlice.reducer);

export const mainStore = configureStore({
    reducer: {
        login: persistedReducer
    },
    /* Configuration du middleware pour éviter les avertissements de sérialisation */
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PAUSE", "persist/PURGE", "persist/REGISTER", "persist/FLUSH"],
            },
        }),
});

export const persistor = persistStore(mainStore);