import { create } from "zustand";
import { openType } from "./openType";

export const useOffice = create<openType>((set: any) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
