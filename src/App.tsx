import { useEffect } from 'react';
import { useGetVehiclesQuery } from './services/vehicle';
import './App.css';
import VehicleCard from './components/VehicleCard';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setVehicles, deleteVehicle, setUpdatedVehicle, setIsCreating } from './store/slices/vehicleSlice';
import SortControls from './components/SortControls';
import { SimpleGrid } from '@chakra-ui/react';
import Modal from './components/Modal';

function App() {
  const dispatch = useAppDispatch();
  const { vehicles, sortBy, sortOrder } = useAppSelector((state) => state.vehicles);
  const { data: vehiclesData, isLoading, error } = useGetVehiclesQuery();

  useEffect(() => {
       if (vehiclesData) {
        dispatch(setVehicles(vehiclesData));
      }
  }, [vehiclesData, dispatch]);

  const getSortedVehicles = () => {
    if (!sortBy) return vehicles;
    
    return [...vehicles].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

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
          <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <SortControls />
            <Modal text="Создать" onClick={() => dispatch(setIsCreating(true))}/>
          </div>
          <SimpleGrid gap="40px">
            {getSortedVehicles().map((vehicle) => (
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