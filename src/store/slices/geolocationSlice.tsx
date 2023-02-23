import { createSlice } from "@reduxjs/toolkit";

interface GeolocationState {
    geolocation: { latitude: number; longitude: number; city: string }[];
}

const initialState: GeolocationState = {
    geolocation: [{ latitude: 53.893009, longitude: 27.567444, city: "Minsk" }],
};

export const geolocationSlice = createSlice({
    name: "geolocation",
    initialState,
    reducers: {},
});

export default geolocationSlice.reducer;
