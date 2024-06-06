import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
import { deleteRecordApi } from "../services/api";

const useRecordStore = create(set => ({
  records: [],
  setRecords: records => set({ records }),

  fetchRecords: async patientId => {
    try {
      const records = await axiosInstance.get(`/cm-users/records/${patientId}`);
      set({ records: records.data }); // Установка records.data
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  },

  addRecord: async (patientId, body) => {
    try {
      await axiosInstance.post(`/cm-users/records/${patientId}`, body);
      await useRecordStore.getState().fetchRecords(patientId);
    } catch (error) {
      console.error("Failed to add record:", error);
    }
  },

  deleteRecord: async (patientId, recordId) => {
    try {
      await deleteRecordApi({ record_id: recordId, user_id: patientId });
      set(state => ({
        records: state.records.filter(record => record.id !== recordId)
      }));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  }
}));

export default useRecordStore;
