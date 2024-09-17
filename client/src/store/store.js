import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';

const rootReducers = combineReducers({ user: userReducer });

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