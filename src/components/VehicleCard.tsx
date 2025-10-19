import React from 'react';
import type { Vehicle } from '../types/Vehicle';
import { Box, Button, Card } from "@chakra-ui/react"
import Modal from './Modal';

interface VehicleCardProps {
  vehicle: Vehicle;
  onDelete: () => void;
  onEdit: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onDelete, onEdit }) => {
  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Box>
      <Card.Body>
        <Card.Title mb="2">{vehicle.name} {vehicle.model}</Card.Title>
        <Card.Description>
            <p>Year: {vehicle.year}</p>
            <p>Price: {vehicle.price}</p>
        </Card.Description>
      </Card.Body>
      <Card.Footer>
      <Button colorPalette="red" onClick={onDelete}>Удалить</Button>
      <Modal text="Редактировать" onClick={onEdit}/>
      </Card.Footer>
    </Box>
  </Card.Root>
  );
};

export default VehicleCard;
