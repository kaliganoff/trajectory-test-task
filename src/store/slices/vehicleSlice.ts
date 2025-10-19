import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UpdateVehicleData, Vehicle } from '../../types/Vehicle';

interface VehiclesState {
    vehicles: Vehicle[];
    updatedVehicle: Vehicle | null;
    isCreating: boolean;
}

const initialState: VehiclesState = {
    vehicles: [],
    updatedVehicle: null,
    isCreating: false,
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
        setUpdatedVehicle: (state, action: PayloadAction<Vehicle | null>) => {
            state.updatedVehicle = action.payload;
        },
        updateVehicle: (state, action: PayloadAction<UpdateVehicleData>) => {
            const { id, name, price } = action.payload;
            const vehicle = state.vehicles.find(vehicle => vehicle.id === id);
            if (vehicle) {
                if (name !== undefined) vehicle.name = name;
                if (price !== undefined) vehicle.price = price;
            }
        },
        createVehicle: (state, action: PayloadAction<Vehicle>) => {
            state.vehicles.push(action.payload);
        },
        setIsCreating: (state, action: PayloadAction<boolean>) => {
            state.isCreating = action.payload;
          },
    },
});

export const {
    setVehicles,
    deleteVehicle,
    setUpdatedVehicle,
    updateVehicle,
    createVehicle,
    setIsCreating,
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
