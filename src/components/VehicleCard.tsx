import React from 'react';
import type { Vehicle } from '../types/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDelete }) => {
  return (
    <div>
        <div className='vehicle-card'>
            <span>{vehicle.name}</span>
            <span>{vehicle.model}</span> 
            <span>{vehicle.year}</span>
            <span>{vehicle.price}</span>
            <button onClick={onDelete}>Удалить</button>
        </div>
    </div>
  );
};

export default VehicleCard;
