import { create } from 'zustand';

export interface ReEntrySettings {
    method: 'SMA' | 'EMA' | 'HMA';
    period: string;
    buyROC: string;
    sellROC: string;
}

interface ReEntryStoreState {
    reEntry: boolean;
    reEntrySettings: ReEntrySettings;
    actions: {

        setReEntry: (reEntry: boolean) => void;
        updateReEntrySettings: (settings: Partial<ReEntrySettings>) => void;
        getData: () => { reEntry: boolean; reEntrySettings: ReEntrySettings };
        reset: () => void;
    }
}

export const useReEntryStore = create<ReEntryStoreState>((set, get) => ({
    reEntry: false,
    reEntrySettings: {
        method: 'SMA',
        period: '20',
        buyROC: '100',
        sellROC: '100'
    },
    actions: {
        setReEntry: (reEntry) => set({ reEntry }),
        updateReEntrySettings: (settings) => set((state) => ({
            reEntrySettings: { ...state.reEntrySettings, ...settings }
        })),
        getData: () => ({
            reEntry: get().reEntry,
            reEntrySettings: get().reEntrySettings
        }),
        reset: () => set({
            reEntry: false,
            reEntrySettings: {
                method: 'SMA',
                period: '20',
                buyROC: '100',
                sellROC: '100'
            }
        }),
    }
}));