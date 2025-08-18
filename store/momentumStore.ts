import { create } from 'zustand';

export interface MomentumSettings {
    index: string;
    baseLine: string;
    baseMovingAvg: string;
    baseLinePeriod: string;
    boundaryLine: string;
    boundaryMovingAvg: string;
    boundaryPeriod: string;
    entryWeight: string;
    liquidationWeight: string;
}

interface MomentumStoreState {
    momentum: boolean;
    momentumSettings: MomentumSettings;
    actions: {
        setMomentum: (momentum: boolean) => void;
        updateMomentumSettiongs: (settings: Partial<MomentumSettings>) => void;
        getData: () => { momentum: boolean; momentumSettings: MomentumSettings };
        reset: () => void;
    }
}

export const useMomentumStore = create<MomentumStoreState>((set, get) => ({
    momentum: false,
    momentumSettings: {
        index: '',
        baseLine: '',
        baseMovingAvg: '',
        baseLinePeriod: '',
        boundaryLine: '',
        boundaryMovingAvg: '',
        boundaryPeriod: '',
        entryWeight: '',
        liquidationWeight: ''
    },
    actions: {
        setMomentum: (momentum) => set({ momentum }),
        updateMomentumSettiongs: (settings) => set((state) => ({
            momentumSettings: { ...state.momentumSettings, ...settings }
        })),
        getData: () => ({
            momentum: get().momentum,
            momentumSettings: get().momentumSettings
        }),
        reset: () => set({
            momentum: false,
            momentumSettings: {
                index: '',
                baseLine: '',
                baseMovingAvg: '',
                baseLinePeriod: '',
                boundaryLine: '',
                boundaryMovingAvg: '',
                boundaryPeriod: '',
                entryWeight: '',
                liquidationWeight: ''
            }
        }),
    }
}));