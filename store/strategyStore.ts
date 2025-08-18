import { create } from 'zustand';

interface StrategyState {
    strategyName: string;
    algorithm: string;
    seed: string;
    rebalancingPeriod: string;
    bandRebalancing: string;
    startDate: string;
    endDate: string;
    actions: {

        setStrategyName: (name: string) => void;
        setAlgorithm: (algorithm: string) => void;
        setSeed: (seed: string) => void;
        setRebalancingPeriod: (period: string) => void;
        setBandRebalancing: (band: string) => void;
        setStartDate: (date: string) => void;
        setEndDate: (date: string) => void;
        getData: () => {
            strategyName: string;
            algorithm: string;
            seed: string;
            rebalancingPeriod: string;
            bandRebalancing: string;
            startDate: string;
            endDate: string;
        };
        reset: () => void;
    }
}

export const useStrategyStore = create<StrategyState>((set, get) => ({
    strategyName: '',
    algorithm: '전략배분 (정적자산배분)',
    seed: '',
    rebalancingPeriod: '',
    bandRebalancing: '',
    allExchangeRatesState: false,
    startDate: Date.now().toString(), // 현재 시간을 문자열로 저장
    endDate: (Date.now() + 86400000).toString(), // 현재 시간에서 1일 더한 시간을 문자열로 저장
    actions: {
        setStrategyName: (name) => set({ strategyName: name }),
        setAlgorithm: (algorithm) => set({ algorithm }),
        setSeed: (seed) => set({ seed }),
        setRebalancingPeriod: (period) => set({ rebalancingPeriod: period }),
        setBandRebalancing: (band) => set({ bandRebalancing: band }),
        setStartDate: (date) => set({ startDate: date }),
        setEndDate: (date) => set({ endDate: date }),
        getData: () => ({
            strategyName: get().strategyName,
            algorithm: get().algorithm,
            seed: get().seed,
            rebalancingPeriod: get().rebalancingPeriod,
            bandRebalancing: get().bandRebalancing,
            startDate: get().startDate,
            endDate: get().endDate
        }),

        reset: () => set({
            strategyName: '',
            algorithm: '전략배분 (정적자산배분)',
            seed: '',
            rebalancingPeriod: '',
            bandRebalancing: '',
            startDate: Date.now().toString(),
            endDate: (Date.now() + 86400000).toString()
        }),
    }
}));