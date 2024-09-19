import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/authSlice';
import jobReducer from './user/jobSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducers = combineReducers({ user: userReducer, job: jobReducer });

const persistConfig = {
    key: "root",
    storage,
    version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefalutMiddleware) => getDefalutMiddleware({
        serializableCheck: false
    }),
});

export const persistor = persistStore(store);