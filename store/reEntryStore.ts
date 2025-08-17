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
    setReEntry: (reEntry: boolean) => void;
    updateReEntrySettings: (settings: Partial<ReEntrySettings>) => void;
    getReEntrySettings: () => ReEntrySettings;
    getData: () => { reEntry: boolean; reEntrySettings: ReEntrySettings };
    reset: () => void;
}

export const useReEntryStore = create<ReEntryStoreState>((set, get) => ({
    reEntry: false,
    reEntrySettings: {
        method: 'SMA',
        period: '20',
        buyROC: '100',
        sellROC: '100'
    },
    setReEntry: (reEntry) => set({ reEntry }),
    updateReEntrySettings: (settings) => set((state) => ({
        reEntrySettings: { ...state.reEntrySettings, ...settings }
    })),
    getReEntrySettings: () => get().reEntrySettings,
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
}));