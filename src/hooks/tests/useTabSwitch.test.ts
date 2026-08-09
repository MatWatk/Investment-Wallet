import { renderHook, act } from "@testing-library/react";
import useTabSwitch from '../useTabSwitch';

describe('useTabSwitch tests', () => {

    test('should switch tabs and filter assets correctly', () => {
        const initialState = 'Tab1';
        const visibleAssets = [
            { market: 'Tab1', name: 'Asset1' },
            { market: 'Tab2', name: 'Asset2' },
            { market: 'Tab3', name: 'Asset3' },
        ];
        const getTabValue = (asset: { market: string }) => asset.market;
        const summaryTransformation = (assets: { market: string }[]) => assets;

        const { result } = renderHook(() => useTabSwitch(initialState, visibleAssets, getTabValue, summaryTransformation));

        expect(result.current.activeTab).toBe('Tab1');
        expect(result.current.actualVisibleAssets).toEqual([{ market: 'Tab1', name: 'Asset1' }]);

        act(() => {
            result.current.handleTabSwitch('Tab2');
        });

        expect(result.current.activeTab).toBe('Tab2');
        expect(result.current.actualVisibleAssets).toEqual([{ market: 'Tab2', name: 'Asset2' }]);
        expect(result.current.actualVisibleAssets).not.toEqual([{ market: 'Tab1', name: 'Asset1' }]);
    });
    test('should return all assets when activeTab is "Summary"', () => {
        const initialState = 'Tab1';
        const visibleAssets = [
            { market: 'Tab1', name: 'Asset1' },
            { market: 'Tab2', name: 'Asset2' },
            { market: 'Tab3', name: 'Asset3' },
        ];
        const getTabValue = (asset: { market: string }) => asset.market;
        const summaryTransformation = (assets: { market: string }[]) => assets;
        
        const { result } = renderHook(() => useTabSwitch(initialState, visibleAssets, getTabValue, summaryTransformation));

        act(() => {
            result.current.handleTabSwitch('Summary');
        })
        expect(result.current.activeTab).toBe('Summary');
        expect(result.current.actualVisibleAssets).toEqual(visibleAssets);
    });
})