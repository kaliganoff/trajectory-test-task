import { configureStore } from '@reduxjs/toolkit';
import { vehiclesApi } from '../services/vehicle';
import vehiclesReducer from './slices/vehicleSlice';

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehiclesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
