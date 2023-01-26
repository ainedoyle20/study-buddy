import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { apiSlice } from "../features/api/apiSlice";
import userReducer from "../features/authentication/services/userSlice";

const rootPersistConfig = {
  key: "root",
  storage,
}

// const persistedReducer = persistReducer(rootPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    user: persistReducer(rootPersistConfig, userReducer)
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }).concat(apiSlice.middleware)
});

export const persistor = persistStore(store);
