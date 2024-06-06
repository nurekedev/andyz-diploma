import { create } from "zustand";
import axiosInstance from "../services/axiosInstance";
import { deleteMarkerApi } from "../services/api";

const useMarkerStore = create(set => ({
  markers: [],
  setMarkers: markers => set({ markers }),

  fetchMarkers: async patientId => {
    try {
      const markers = await axiosInstance.get(`/cm-users/markers/${patientId}`);
      set({ markers: markers.data });
    } catch (error) {
      console.error("Failed to fetch markers:", error);
    }
  },

  addMarker: async (patientId, body) => {
    const response = await axiosInstance.post(
      `/cm-users/markers/${patientId}`,
      body
    );
    set(state => ({ markers: [...state.markers, response.data] }));
  },
  deleteMarker: async (patientId, markerId) => {
    try {
      await deleteMarkerApi({ marker_id: markerId, user_id: patientId });
      set(state => ({
        markers: state.markers.filter(marker => marker.id !== markerId)
      }));
    } catch (error) {
      console.error("Failed to delete marker:", error);
    }
  }
}));

export default useMarkerStore;
