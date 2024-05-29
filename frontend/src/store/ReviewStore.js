import create from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../requests/Token";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

// Интерцептор для обработки успешных ответов
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

const useReviewStore = create((set, get) => ({
  reviews: [],
  setReviews: reviews => set({ reviews }),
  fetchReviews: async courseId => {
    try {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `JWT ${Cookies.get("accessToken")}`;
      const response = await axiosInstance.get(`/course/${courseId}/reciew/`);
      if (response.status === 401) {
        await refreshAccessToken();
        get().fetchReviews(courseId);
      }
      set({ reviews: response.data });
    } catch (error) {
      // Любая другая ошибка - выводим сообщение в консоль
      console.error("Failed to fetch reviews:", error);
    }
  },
  addReview: async (courseId, rating, description) => {
    try {
      const response = await axiosInstance.post(
        `/course/${courseId}/reviews/`,
        { rating, description }
      );
      set(state => ({ reviews: [...state.reviews, response.data] }));
    } catch (error) {
      console.error("Failed to add reviews:", error);
    }
  },
  updateReview: async (course_slug, commentId, rating, description) => {
    try {
      const response = await axiosInstance.patch(
        `/course/${course_slug}/reviews/${commentId}/`,
        { rating, description }
      );
      console.log(response);
      set(state => ({
        reviews: state.reviews.map(
          reviews =>
            reviews.id === commentId
              ? { ...reviews, body: rating, description }
              : reviews
        )
      }));
    } catch (error) {
      console.error("Failed to update review:", error);
    }
  },
  deleteReview: async (course_slug, review_id) => {
    try {
      await axiosInstance.delete(
        `/course/${course_slug}/review/${review_id}/`
      );
      set(state => ({
        reviews: state.reviews.filter(review => review.id !== review_id)
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }
}));

export default useReviewStore;
