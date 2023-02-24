import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GeolocationState {
  geolocation: GeolocationEl[];
  autoGeolocation: GeolocationEl;
}

interface GeolocationEl {
  latitude?: number;
  longitude?: number;
  city?: string;
}

const initialState: GeolocationState = {
  geolocation: [],
  autoGeolocation: {},
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    addAutoGeolocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
        city: string;
      }>
    ) => {
      const newAutoGeolocation: GeolocationEl = {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        city: action.payload.city,
      };
      return { ...state, autoGeolocation: newAutoGeolocation };
    },
    addAutoGeoToGeolocation: (state) => {
      return {
        ...state,
        geolocation: [...state.geolocation, state.autoGeolocation],
      };
    },
  },
});

export const { addAutoGeolocation, addAutoGeoToGeolocation } =
  geolocationSlice.actions;

export default geolocationSlice.reducer;
