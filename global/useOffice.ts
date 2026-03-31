import { create } from "zustand";
import { openType, selectedItem } from "./openType";

type useOfficeType = {
  openEdit: boolean;
  setOpenEdit: (state: boolean) => void;
};
export const useOffice = create<openType & useOfficeType & selectedItem>(
  (set: any) => ({
    open: false,
    setOpen: (state) => set({ open: state }),

    openEdit: false,
    setOpenEdit: (state) => set({ openEdit: state }),

    selectedItem: undefined,
    setSelectedItem: (item) => set({ selectedItem: item }),
  }),
);
