import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

const useStore = create(set => ({
  data: [],
  currentPage: 1,
  itemsPerPage: 20,
  fetchData: async () => {
    const response = await axiosInstance.get(`/cm-users/custom-users`);
    set({ data: response.data });
  },
  setPage: page => set({ currentPage: page })
}));

export default useStore;
