import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";

const useUserStore = create(set => ({
  data: [],
  currentPage: 1,
  itemsPerPage: 20,
  fetchData: async () => {
    const response = await axiosInstance.get(`/auth/users/`);
    set({ data: response.data });
  },
  setPage: page => set({ currentPage: page }),
  deleteUser: async userId => {
    await axiosInstance.delete(`/cm-users/custom-users/${userId}`);
    set(state => ({
      data: state.data.filter(user => user.id !== userId)
    }));
  },
  updateUser: async (userId, updatedUserData) => {
    const response = await axiosInstance.put(
      `/cm-users/custom-users/${userId}`,
      updatedUserData
    );
    set(state => ({
      data: state.data.map(user => (user.id === userId ? response.data : user))
    }));
  },
  createUser: async newUserData => {
    const response = await axiosInstance.post(
      `/auth/users/`,
      newUserData
    );
    set(state => ({
      data: [...state.data, response.data]
    }));
  }
}));

export default useUserStore;
