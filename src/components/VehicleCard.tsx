import React from 'react';
import type { Vehicle } from '../types/Vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div>
        <div>{vehicle.id} {vehicle.name} {vehicle.model}</div>
    </div>
  );
};

export default VehicleCard;
