import { create } from "zustand";

type TitleType = {
  link: string;
  name: string
  pages?: Array<any>;
};

type UseTitleType = {
  title: TitleType;
  setTitle: (title: TitleType) => void; // function directly
};

export const useTitle = create<UseTitleType>((set) => ({
  title: {
    link: "",
    name: "",
    pages: [],
  },

  setTitle: (title: TitleType) => set({ title }),
}));
