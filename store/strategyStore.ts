import { create } from 'zustand';
import { useAssetStore } from './assetsStore';
interface StrategyState {
    strategyName: string;
    algorithm: string;
    seed: string;
    rebalancingPeriod: string;
    bandRebalancing: string;
    allExchangeRatesState: boolean;
    setStrategyName: (name: string) => void;
    setAlgorithm: (algorithm: string) => void;
    setSeed: (seed: string) => void;
    setRebalancingPeriod: (period: string) => void;
    setBandRebalancing: (band: string) => void;
    setAllExchangeRatesState: () => void;
    getData: () => {
        strategyName: string;
        algorithm: string;
        seed: string;
        rebalancingPeriod: string;
        bandRebalancing: string;
        allExchangeRatesState: boolean;
    };
    reset: () => void;
}

export const useStrategyStore = create<StrategyState>((set, get) => ({
    strategyName: '',
    algorithm: '',
    seed: '',
    rebalancingPeriod: '',
    bandRebalancing: '',
    allExchangeRatesState: false,
    setStrategyName: (name) => set({ strategyName: name }),
    setAlgorithm: (algorithm) => set({ algorithm }),
    setSeed: (seed) => set({ seed }),
    setRebalancingPeriod: (period) => set({ rebalancingPeriod: period }),
    setBandRebalancing: (band) => set({ bandRebalancing: band }),
    setAllExchangeRatesState: () => set((state) => {
        // 전체 환율 반영 상태 업데이트
        const assetState = useAssetStore.getState();

        if (assetState.assetList.length === 0) return {};
        const nextExchangeRatesState = !state.allExchangeRatesState;

        return {
            allExchangeRatesState: nextExchangeRatesState,
            assetList: assetState.assetList.map(asset => {
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

    getData: () => ({
        strategyName: get().strategyName,
        algorithm: get().algorithm,
        seed: get().seed,
        rebalancingPeriod: get().rebalancingPeriod,
        bandRebalancing: get().bandRebalancing,
        allExchangeRatesState: get().allExchangeRatesState,
    }),

    reset: () => set({
        strategyName: '',
        algorithm: '',
        seed: '',
        rebalancingPeriod: '',
        bandRebalancing: '',
    }),
}));