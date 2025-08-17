import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AssetType } from '@/lib/contents/exData';
import { useStrategyStore } from './strategyStore';


export interface AssetData {
    id: string;
    type: AssetType;
    assetGroup: string;
    weight: string;
    exchangeRateState: boolean;
}

interface AssetStoreState {
    assetList: AssetData[];
    addAsset: () => void;
    updateAsset: (id: string, newData: Partial<AssetData>) => void;
    deleteAsset: (id: string) => void;
    getAssetItem: (id: string) => AssetData | undefined;
    getData: () => { assetList: AssetData[] };
    reset: () => void;
}

export const useAssetStore = create<AssetStoreState>((set, get) => ({
    assetList: [],
    addAsset: () => set((state) => ({
        assetList: [...state.assetList, { id: uuidv4(), type: '전략', assetGroup: '', weight: '0', exchangeRateState: false }]
    })),
    updateAsset: (id, newData) => set((state) => {
        console.log('update')
        const updatedAssetList = state.assetList.map(asset =>
            asset.id === id ? { ...asset, ...newData } : asset
        );
        // 전체 환율 반영 상태

        // 미국 관련 자산군만 필터링
        const usAssets = updatedAssetList.filter(asset =>
            asset.type === '미국 자산군' ||
            asset.type === '미국 ETF' ||
            asset.type === '미국 주식'
        );
        const strategyState = useStrategyStore.getState();


        // 미국 관련 자산군이 있을 때만 미국 관련 자산군에 대해 전체 환율 반영 상태 업데이트
        if (usAssets.length !== 0) {
            const allExchangeRatesState = usAssets.every(asset => asset.exchangeRateState);
            console.log('전체 환율 반영', allExchangeRatesState);
            if (allExchangeRatesState !== strategyState.allExchangeRatesState) {
                useStrategyStore.setState({ allExchangeRatesState });
            }
        }

        return { assetList: updatedAssetList };
    }),
    deleteAsset: (id) => set((state) => {
        // 미국 관련 자산군만 필터링
        const deletedAsset = state.assetList.filter(asset => asset.id !== id);
        const usAssets = deletedAsset.filter(asset =>
            asset.type === '미국 자산군' ||
            asset.type === '미국 ETF' ||
            asset.type === '미국 주식'
        );
        const strategyState = useStrategyStore.getState();


        // 미국 관련 자산군이 있을 때만 미국 관련 자산군에 대해 전체 환율 반영 상태 업데이트
        if (usAssets.length !== 0) {
            const allExchangeRatesState = usAssets.every(asset => asset.exchangeRateState);
            console.log('전체 환율 반영', allExchangeRatesState);
            if (allExchangeRatesState !== strategyState.allExchangeRatesState) {
                useStrategyStore.setState({ allExchangeRatesState });
            }
        }
        return {
            assetList: state.assetList.filter(asset => asset.id !== id)
        };
    }),
    getAssetItem: (id) => get().assetList.find(asset => asset.id === id),
    getData: () => ({ assetList: get().assetList }),
    reset: () => set({ assetList: [] }),
}));