import { create } from "zustand";
import {
  fetchReviews,
  addReview,
  updateReview,
  deleteReview,
  fetchUser
} from "../services/api";

const useReviewStore = create((set, get) => ({
  reviews: [],
  userData: [],
  setUserData: userData => set({ userData }),
  setReviews: reviews => set({ reviews }),

  fetchUser: async () => {
    try {
      const userData = await fetchUser();
      set({ userData });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  },

  fetchReviews: async courseId => {
    try {
      const reviews = await fetchReviews(courseId);
      set({ reviews });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  },

  addReview: async (courseId, rating, description) => {
    try {
      const newReview = await addReview(courseId, rating, description);
      set(state => ({ reviews: [...state.reviews, newReview] }));
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  },

  updateReview: async (courseSlug, reviewId, rating, description) => {
    try {
      const updatedReview = await updateReview(
        courseSlug,
        reviewId,
        rating,
        description
      );
      set(state => ({
        reviews: state.reviews.map(
          review => (review.id === reviewId ? updatedReview : review)
        )
      }));
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  },

  deleteReview: async (courseSlug, reviewId) => {
    try {
      await deleteReview(courseSlug, reviewId);
      set(state => ({
        reviews: state.reviews.filter(review => review.id !== reviewId)
      }));
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  },

  getUserReview: () => {
    const { reviews, userData } = get();
    return reviews?.filter(review => review.user.id === userData.id);
  },

  getOtherUserReviews: () => {
    const { reviews, userData } = get();
    return reviews?.filter(review => review.user.id !== userData.id);
  }
}));

export default useReviewStore;
