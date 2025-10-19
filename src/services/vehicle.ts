import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Vehicle } from '../types/Vehicle';

export const vehiclesApi = createApi({
  reducerPath: 'vehiclesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ofc-test-01.tspb.su/test-task/',
  }),
  tagTypes: ['Vehicle'],
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => 'vehicles',
      providesTags: ['Vehicle'],
    }),
  }),
});

export const { useGetVehiclesQuery } = vehiclesApi;