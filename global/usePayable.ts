import { create } from "zustand";
import { openType } from "./openType";

type usePayableType = {
  showOpen: boolean;
  setShowOpen: (state: boolean) => any;

  payable: any;
  setPayable: (payable: any) => any;
};
export const usePayable = create<openType & usePayableType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),

  showOpen: false,
  setShowOpen: (state) => set({ showOpen: state }),

  payable: null,
  setPayable: (payable) => set({ payable: payable }),
}));
