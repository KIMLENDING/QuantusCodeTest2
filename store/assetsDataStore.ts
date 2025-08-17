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

interface AssetsDataState {
    strategyName: string;
    algorithm: string;
    seed: string;
    rebalancingPeriod: string;
    bandRebalancing: string;
    allExchangeRatesState: boolean;
    assetList: AssetData[];
    setStrategyName: (name: string) => void;
    setAlgorithm: (algorithm: string) => void;
    setSeed: (seed: string) => void;
    setRebalancingPeriod: (period: string) => void;
    setBandRebalancing: (band: string) => void;
    setAllExchangeRatesState: () => void;
    addAssetList: () => void;
    updateAsset: (id: string, newData: Partial<AssetData>) => void;
    deleteAsset: (id: string) => void;
    getAssetItem: (id: string) => AssetData | undefined;
    getExchangeRatesState: (id: string) => boolean | undefined;
    reset: () => void;
    save: () => void;
}

export const useAssetsDataStore = create<AssetsDataState>((set, get) => ({
    strategyName: '',
    algorithm: '전략배분 (정적자산배분)',
    seed: '',
    rebalancingPeriod: '',
    bandRebalancing: '',
    allExchangeRatesState: false,
    assetList: [],
    setStrategyName: (name: string) => set({ strategyName: name }),
    setAlgorithm: (algorithm: string) => set({ algorithm }),
    setSeed: (seed: string) => set({ seed }),
    setRebalancingPeriod: (period: string) => set({ rebalancingPeriod: period }),
    setBandRebalancing: (band: string) => set({ bandRebalancing: band }),
    setAllExchangeRatesState: () => set((state) => {
        // 전체 환율 반영 상태 업데이트
        if (state.assetList.length === 0) return {};
        const nextExchangeRatesState = !state.allExchangeRatesState;

        return {
            allExchangeRatesState: nextExchangeRatesState,
            assetList: state.assetList.map(asset => {
                // 미국 관련 자산만 exchangeRateState 변경
                const isUSAsset =
                    asset.type === '미국 자산군' ||
                    asset.type === '미국 ETF' ||
                    asset.type === '미국 주식';

                return {
                    ...asset,
                    exchangeRateState: isUSAsset ? nextExchangeRatesState : asset.exchangeRateState
                };
            })
        };
    }),

    addAssetList: () => set((state) => ({
        assetList: [...state.assetList,
        { id: uuidv4(), type: '전략', assetGroup: '', weight: '0', exchangeRateState: false }]
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

        // 미국 관련 자산군이 있을 때만 미국 관련 자산군에 대해 전체 환율 반영 상태 업데이트
        if (usAssets.length !== 0) {
            const allExchangeRatesState = usAssets.every(asset => asset.exchangeRateState);
            console.log('All exchange rates state:', allExchangeRatesState);
            if (allExchangeRatesState !== state.allExchangeRatesState) {
                set({ allExchangeRatesState });
            }
        }

        return { assetList: updatedAssetList };
    }),
    deleteAsset: (id) => set((state) => ({
        assetList: state.assetList.filter(asset => asset.id !== id)
    })),
    getExchangeRatesState: (id) => {
        const asset = get().assetList.find(asset => asset.id === id);
        return asset ? asset.exchangeRateState : undefined;
    },
    getAssetItem: (id: string) => {
        const asset = get().assetList.find(asset => asset.id === id);
        return asset ? { ...asset } : undefined;
    },
    reset: () => set({
        strategyName: '',
        algorithm: '',
        seed: '',
        rebalancingPeriod: '',
        bandRebalancing: '',
        allExchangeRatesState: false,
        assetList: [],
    }),
    save: () => {
        const state = get();
        const { strategyName, algorithm, seed, rebalancingPeriod, bandRebalancing, allExchangeRatesState, assetList } = state;

        if (strategyName.length < 1) {
            console.error('전략 이름이 필요합니다.');
            return;
        } else if (!algorithm) {
            console.error('알고리즘이 필요합니다.');
            return;
        } else if (!seed) {
            console.error('시드가 필요합니다.');
            return;
        } else if (!rebalancingPeriod) {
            console.error('리밸런싱 주기가 필요합니다.');
            return;
        } else if (!bandRebalancing) {
            console.error('밴드 리밸런싱이 필요합니다.');
            return;
        } else if (!Array.isArray(assetList) || assetList.length === 0) {
            console.error('자산 목록이 필요합니다.');
            return;
        } else if (assetList.some(asset => !asset.type || !asset.assetGroup || +asset.weight <= 0)) {
            console.error('모든 자산에 대해 종류, 자산군, 비중이 필요합니다. 비중은 0보다 커야 합니다.');
            return;
        }

        console.log('Saving state:', { strategyName, algorithm, seed, rebalancingPeriod, bandRebalancing, allExchangeRatesState, assetList });
    }
}));
