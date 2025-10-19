import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setSortBy, setSortOrder } from "../store/slices/vehicleSlice";
import { Select, HStack, Text, Portal, createListCollection } from "@chakra-ui/react";

const SortControls: React.FC = () => {
    const dispatch = useAppDispatch();
    const { sortBy, sortOrder } = useAppSelector((state) => state.vehicles);

    const handleSortByChange = (value: string) => {
        dispatch(setSortBy(value === 'none' ? null : value as 'year' | 'price'));
    };

    const handleSortOrderChange = (value: string) => {
        dispatch(setSortOrder(value as 'asc' | 'desc'));
    };

    const sortByOptions = createListCollection({
        items: [
            { label: "Без сортировки", value: "none" },
            { label: "По году", value: "year" },
            { label: "По цене", value: "price" },
        ],
    });

    const sortOrderOptions = createListCollection({
        items: [
            { label: "По возрастанию", value: "asc" },
            { label: "По убыванию", value: "desc" },
        ],
    });

    return (
        <HStack gap={4} align="center">
            <Text fontSize="sm" fontWeight="medium">Сортировка:</Text>
            <Select.Root 
                size="sm" 
                width="200px"
                value={[sortBy || 'none']}
                onValueChange={(details) => handleSortByChange(details.value[0])}
                collection={sortByOptions}
            >
                <Select.HiddenSelect />
                <Select.Control>
                    <Select.Trigger cursor="pointer">
                        <Select.ValueText placeholder="Выберите поле" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {sortByOptions.items.map((option) => (
                                <Select.Item item={option} key={option.value} cursor="pointer">
                                    {option.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
            {sortBy && (
                <Select.Root 
                    size="sm" 
                    width="200px"
                    value={[sortOrder]}
                    onValueChange={(details) => handleSortOrderChange(details.value[0])}
                    collection={sortOrderOptions}
                >
                    <Select.HiddenSelect />
                    <Select.Control>
                        <Select.Trigger cursor="pointer">
                            <Select.ValueText placeholder="Направление" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {sortOrderOptions.items.map((option) => (
                                    <Select.Item item={option} key={option.value} cursor="pointer">
                                        {option.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            )}
        </HStack>
    );
};

export default SortControls;
