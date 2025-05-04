import { create } from 'zustand';

type UIStoreType = {
  modals: Record<string, boolean>;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
  isModalOpen: (key: string) => boolean;
};

export const useUIStore = create<UIStoreType>((set, get) => ({
  modals: {},
  openModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: true }
    })),
  closeModal: (key) =>
    set((state) => ({
      modals: { ...state.modals, [key]: false }
    })),
  isModalOpen: (key) => get().modals[key] ?? false
}));
