import { create } from 'zustand';
import { useAssetStore } from './assetsStore';
interface StrategyState {
    strategyName: string;
    algorithm: string;
    seed: string;
    rebalancingPeriod: string;
    bandRebalancing: string;
    setStrategyName: (name: string) => void;
    setAlgorithm: (algorithm: string) => void;
    setSeed: (seed: string) => void;
    setRebalancingPeriod: (period: string) => void;
    setBandRebalancing: (band: string) => void;
    getData: () => {
        strategyName: string;
        algorithm: string;
        seed: string;
        rebalancingPeriod: string;
        bandRebalancing: string;
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


    getData: () => ({
        strategyName: get().strategyName,
        algorithm: get().algorithm,
        seed: get().seed,
        rebalancingPeriod: get().rebalancingPeriod,
        bandRebalancing: get().bandRebalancing
    }),

    reset: () => set({
        strategyName: '',
        algorithm: '',
        seed: '',
        rebalancingPeriod: '',
        bandRebalancing: '',
    }),
}));