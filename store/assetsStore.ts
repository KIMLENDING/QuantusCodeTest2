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
        return { assetList: updatedAssetList };
    }),
    deleteAsset: (id) => set((state) => ({
        assetList: state.assetList.filter(asset => asset.id !== id)
    }
    )),
    getAssetItem: (id) => get().assetList.find(asset => asset.id === id),
    getData: () => ({ assetList: get().assetList }),
    reset: () => set({ assetList: [] }),
}));