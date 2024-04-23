import create from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../requests/Token";

const authToken = Cookies.get("access_token");
console.log(authToken);
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  // Добавляем заголовки по умолчанию, включая авторизацию с токеном
  headers: {
    Authorization: `JWT ${Cookies.get("access_token")}`,
    "Content-Type": "application/json"
  }
});

// Добавляем интерцептор для обработки успешных ответов
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      return refreshAccessToken();
    }
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

const useCommentStore = create(set => ({
  comments: [],
  setComments: comments => set({ comments }),
  fetchComments: async (courseId, lessonSlug) => {
    try {
      const response = await axiosInstance.get(
        `/course/${courseId}${lessonSlug}/comments/`
      );
      set({ comments: response.data });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },
  addComment: async (courseId, lessonSlug, body) => {
    try {
      const response = await axiosInstance.post(
        `/course/${courseId}${lessonSlug}/comments/`,
        { body }
      );
      set(state => ({ comments: [...state.comments, response.data] }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  },
  updateComment: async (course_slug, lesson_slug, commentId, body) => {
    try {
      const response = await axiosInstance.patch(
        `/course/${course_slug}${lesson_slug}/comments/${commentId}/`,
        { body }
      );
      console.log(response);
      set(state => ({
        comments: state.comments.map(
          comment =>
            comment.id === commentId ? { ...comment, body: body } : comment
        )
      }));
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  },
  deleteComment: async (course_slug, lesson_slug, commentId) => {
    try {
      await axiosInstance.delete(
        `/course/${course_slug}${lesson_slug}/comments/${commentId}/`
      );
      set(state => ({
        comments: state.comments.filter(comment => comment.id !== commentId)
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }
}));

export default useCommentStore;
