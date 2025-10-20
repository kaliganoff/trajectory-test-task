import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSortBy, setSortOrder } from "../store/slices/vehicleSlice";
import { Select, HStack, Text, Portal, createListCollection } from "@chakra-ui/react";

const SortControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sortBy, sortOrder } = useAppSelector((state) => state.vehicles);

    const handleSortChange = (value: string) => {
        if (value === 'none') {
            dispatch(setSortBy(null));
            dispatch(setSortOrder('asc'));
        } else {
            const [field, order] = value.split('_');
            dispatch(setSortBy(field as 'year' | 'price'));
            dispatch(setSortOrder(order as 'asc' | 'desc'));
        }
    };

    const getCurrentValue = () => {
        if (!sortBy) return 'none';
        return `${sortBy}_${sortOrder}`;
    };

    const sortOptions = createListCollection({
        items: [
            { label: "Нет", value: "none" },
            { label: "Год ↑", value: "year_asc" },
            { label: "Год ↓", value: "year_desc" },
            { label: "Цена ↑", value: "price_asc" },
            { label: "Цена ↓", value: "price_desc" },
        ],
    });

    return (
        <HStack gap={4} align="center">
            <Text fontSize="sm" fontWeight="medium">Сортировка:</Text>
            <Select.Root 
                size="sm" 
                width="120px"
                value={[getCurrentValue()]}
                onValueChange={(details) => handleSortChange(details.value[0])}
                collection={sortOptions}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger cursor="pointer">
                        <Select.ValueText placeholder="Выберите сортировку" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {sortOptions.items.map((option) => (
                                <Select.Item item={option} key={option.value} cursor="pointer">
                                    {option.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </HStack>
    );
};

export default SortControls;
