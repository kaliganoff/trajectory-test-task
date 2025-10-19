import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle } from '../../types/Vehicle';

interface VehiclesState {
  vehicles: Vehicle[];
}

const initialState: VehiclesState = {
  vehicles: [],
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload;
    },
    deleteVehicle: (state, action: PayloadAction<number>) => {
        state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
      },
  },
});

export const {
  setVehicles,
  deleteVehicle
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
