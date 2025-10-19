import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"
import type { CreateVehicleData } from "@/types/Vehicle";
import ModalInput from "./ModalInput";
import { setUpdatedVehicle, updateVehicle } from "../store/slices/vehicleSlice";

interface ModalProps {
    text: String,
    onClick: () => void,
}

const Modal: React.FC<ModalProps> = ({ text, onClick }) => {
    const dispatch = useAppDispatch();
    const { updatedVehicle } = useAppSelector((state) => state.vehicles);

    const [open, setOpen] = useState(false)

    const [modalData, setModalData] = useState<CreateVehicleData>({
        name: '',
        model: '',
        year: new Date().getFullYear(),
        color: 'black',
        price: 0,
        latitude: 55.753332,
        longitude: 37.621676,
    });

    useEffect(() => {
        if (updatedVehicle) {
            setModalData({
                name: updatedVehicle.name,
                model: updatedVehicle.model,
                year: updatedVehicle.year,
                color: updatedVehicle.color,
                price: updatedVehicle.price,
                latitude: updatedVehicle.latitude,
                longitude: updatedVehicle.longitude,
            });
        } else {
            setModalData({
                name: '',
                model: '',
                year: new Date().getFullYear(),
                color: '#000000',
                price: 0,
                latitude: 55.753332,
                longitude: 37.621676,
            });
        }
    }, [updatedVehicle]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (updatedVehicle) {
          dispatch(updateVehicle({
            id: updatedVehicle.id,
            name: modalData.name,
            price: modalData.price,
          }));
          dispatch(setUpdatedVehicle(null));
        } else {
        }

        setOpen(false);
      };

    return (
        <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm" onClick={onClick}>
                    {text}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>{updatedVehicle ? "Редактирование машины" : "Создание машины"}</Dialog.Title>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body>
                            <form onSubmit={handleSubmit}>
                                <ModalInput
                                    label="Name:"
                                    type="string"
                                    value={modalData.name}
                                    onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
                                />
                                <ModalInput
                                    label="Price:"
                                    type="number"
                                    value={modalData.price}
                                    onChange={(e) => setModalData({ ...modalData, price: Number(e.target.value) })}
                                />
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={handleSubmit}>Сохранить</Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

export default Modal;