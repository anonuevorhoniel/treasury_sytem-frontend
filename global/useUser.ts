import { create } from "zustand";

type userType = {
    user: any;
    setUser: (user: any) => any;
}
export const useUser = create<userType>((set) => ({
    user: null,
    setUser: (user) => set({user: user})
}))