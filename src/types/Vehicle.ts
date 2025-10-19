export interface Vehicle {
    id: number;
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude: number;
    longitude: number;
  }

  export interface UpdateVehicleData {
    id: number;
    name?: string;
    price?: number;
  }

  export interface CreateVehicleData {
    name: string;
    model: string;
    year: number;
    color: string;
    price: number;
    latitude: number;
    longitude: number;
  }