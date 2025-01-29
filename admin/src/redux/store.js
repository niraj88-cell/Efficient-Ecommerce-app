import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux"; // This is your userSlice reducer
import productReducer from "./productRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
    user: userReducer, // Add your user slice reducer
    product:productReducer
});

// Persist configuration
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Persistor for the store
export const persistor = persistStore(store);
