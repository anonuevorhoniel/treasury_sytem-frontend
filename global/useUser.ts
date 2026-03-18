import { create } from "zustand";
import { openType } from "./openType";

type userType = {
  user: any;
  setUser: (user: any) => any;
};
export const useUser = create<userType & openType>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),

  open: false,
  setOpen: (state) => set({ open: state }),
}));
