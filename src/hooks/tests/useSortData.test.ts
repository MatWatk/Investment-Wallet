import { act, renderHook } from "@testing-library/react";
import useSortData from '../useSortData';


describe('useSortData tests', () => {
    test('should sort data correctly in ascending order', () => {
        const data = [
            { name: 'Bitcoin', price: 50000 },
            { name: 'Ethereum', price: 3000 },
            { name: 'Cardano', price: 2 },
        ];
        const accessors = {
            name: (item: { name: string }) => item.name,
            price: (item: { price: number }) => item.price,
        };
        const initialSortConfig = { key: 'price', direction: 'ascending' as const };

        const { result } = renderHook(() => useSortData(data, accessors, initialSortConfig));

        expect(result.current.sortedData).toEqual([
            { name: 'Cardano', price: 2 },
            { name: 'Ethereum', price: 3000 },
            { name: 'Bitcoin', price: 50000 },
        ]);
        act(() => {
            result.current.requestSort('name');
        });
        expect(result.current.sortedData).toEqual([
            { name: 'Bitcoin', price: 50000 },
            { name: 'Cardano', price: 2 },
            { name: 'Ethereum', price: 3000 },
        ]);
        act(() => {
            result.current.requestSort('price');
        });
        expect(result.current.sortedData).toEqual([
            { name: 'Cardano', price: 2 },
            { name: 'Ethereum', price: 3000 },
            { name: 'Bitcoin', price: 50000 },
        ]);
    });
    test('should return original data when no sort config is provided', () => {
        const data = [
            { name: 'Bitcoin', price: 50000 },
            { name: 'Ethereum', price: 3000 },
            { name: 'Cardano', price: 2 },
        ];

        const accessors = {
            price: (item: { name: string; price: number }) => item.price,
        };

        const { result } = renderHook(() =>
            useSortData(data, accessors)
        );

        expect(result.current.sortedData).toEqual(data);
        expect(result.current.sortConfig).toBeNull();
    });

    test('should filter data using getSpecialData function', () => {
        const data = [
            { name: 'Bitcoin', price: 50000, special: true },
            { name: 'Ethereum', price: 3000, special: false },
            { name: 'Cardano', price: 2, special: true },
        ];
        const accessors = {
            price: (item: { price: number }) => item.price,
        };
        const getSpecialData = (item: { special: boolean }) => item.special;

        const { result } = renderHook(() => useSortData(data, accessors, null, getSpecialData));
        expect(result.current.sortedData).toEqual([
            { name: 'Bitcoin', price: 50000, special: true },
            { name: 'Cardano', price: 2, special: true },
        ]);
    });
});