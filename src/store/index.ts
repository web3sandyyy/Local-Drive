import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import driveReducer from "./slices/driveSlice";
import directoryReducer from "./slices/directorySlice";
import localforage from "localforage";

const persistConfig = {
  key: "root",
  storage: localforage,
};

const persistedReducer = persistReducer(persistConfig, driveReducer);

const store = configureStore({
  reducer: {
    drive: persistedReducer,
    directory: directoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
