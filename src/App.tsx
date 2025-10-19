import { useEffect } from 'react';
import { useGetVehiclesQuery } from './services/vehicle';
import './App.css';
import VehicleCard from './components/VehicleCard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setVehicles, deleteVehicle, setUpdatedVehicle } from './store/slices/vehicleSlice';
import { SimpleGrid } from '@chakra-ui/react';

function App() {
  const dispatch = useAppDispatch();
  const { vehicles } = useAppSelector((state) => state.vehicles);
  const { data: vehiclesData, isLoading, error } = useGetVehiclesQuery();

  useEffect(() => {
       if (vehiclesData) {
        dispatch(setVehicles(vehiclesData));
      }
  }, [vehiclesData, dispatch]);

  if (isLoading) {
    return (
      <div>
        <div>Загрузка автомобилей...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>Ошибка: {JSON.stringify(error)}</div>
      </div>
    );
  }

  return (
    <div>
      <header>
        <h1>Test Task</h1>
      </header>

      <main>
          <h2>Список автомобилей</h2>
          <SimpleGrid gap="40px">
            {vehicles.map((vehicle) => (
              <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              onDelete={() => dispatch(deleteVehicle(vehicle.id))}
              onEdit={() => dispatch(setUpdatedVehicle(vehicle))}
            />))}
            </SimpleGrid>
      </main>
    </div>
  );
}

export default App;