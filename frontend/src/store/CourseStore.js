import { create } from "zustand";

const useCourseStore = create(set => ({
  defaultSectionIndex: null,
  setDefaultSectionIndex: index => set({ defaultSectionIndex: index }),
  courseDetailData: null,
  setCourseDetailData: data => set({ courseDetailData: data })
}));

export default useCourseStore;