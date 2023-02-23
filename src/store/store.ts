import { configureStore } from "@reduxjs/toolkit";
import { geolocationSlice } from "./slices/geolocationSlice";

export const store = configureStore({
    reducer: { geolocation: geolocationSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
