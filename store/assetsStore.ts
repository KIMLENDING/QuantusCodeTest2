import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { AssetType } from '@/lib/contents/exData';

export interface AssetData {
    id: string;
    type: AssetType;
    assetGroup: string;
    weight: string;
    exchangeRateState: boolean;
}

interface AssetStoreState {
    assetList: AssetData[];
    actions: {
        addAsset: () => void;
        updateAsset: (id: string, newData: Partial<AssetData>) => void;
        deleteAsset: (id: string) => void;
        allCheck: (assetList: AssetData[]) => boolean;
        updateAllCheck: (checked: boolean) => void;
        getAssetItem: (id: string) => AssetData | undefined;
        getData: () => { assetList: AssetData[] };
        reset: () => void;
    }
}

export const useAssetStore = create<AssetStoreState>((set, get) => ({
    assetList: [],
    actions: {
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
        allCheck: (assetList) => {
            const usAssets = assetList.filter(asset =>
                asset.type === '미국 자산군' ||
                asset.type === '미국 ETF' ||
                asset.type === '미국 주식'
            );
            // 자산군이 있을 때
            if (usAssets.length !== 0) {
                // 참이면 
                const allExchangeRatesState = usAssets.every(asset => asset.exchangeRateState);
                if (allExchangeRatesState) return true; // 체크박스 활성화
                // 거짓이면 체크박스 비활성화
                return false;
            }
            // 자산군이 없으면 체크박스 비활성화
            return false;
        },

        updateAllCheck: (checked: boolean) => {
            const assetList = get().assetList;
            const usAssets = assetList.filter(asset =>
                asset.type === '미국 자산군' ||
                asset.type === '미국 ETF' ||
                asset.type === '미국 주식'
            );
            // 미국 관련 자산군이 있을 때만 전체 환율 반영 상태 업데이트
            if (usAssets.length !== 0) {
                usAssets.forEach(asset => {
                    // 이미 원하는 상태면 set 호출하지 않음 (불필요한 상태 변경 방지)
                    if (asset.exchangeRateState !== checked) {
                        get().actions.updateAsset(asset.id, { exchangeRateState: checked });
                    }
                });
            }
        },

        getAssetItem: (id) => get().assetList.find(asset => asset.id === id),
        getData: () => ({ assetList: get().assetList }),
        reset: () => set({ assetList: [] }),
    }
}));