import { create } from "zustand";
import { fetchComments, addComment, updateComment, deleteComment } from "../services/api";

const useCommentStore = create(set => ({
  comments: [],
  setComments: comments => set({ comments }),

  fetchComments: async (courseId, lessonSlug) => {
    try {
      const comments = await fetchComments(courseId, lessonSlug);
      set({ comments });
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  },

  addComment: async (courseId, lessonSlug, body) => {
    try {
      const newComment = await addComment(courseId, lessonSlug, body);
      set(state => ({ comments: [...state.comments, newComment] }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  },

  updateComment: async (courseId, lessonSlug, commentId, body) => {
    try {
      const updatedComment = await updateComment(
        courseId,
        lessonSlug,
        commentId,
        body
      );
      set(state => ({
        comments: state.comments.map(
          comment => (comment.id === commentId ? updatedComment : comment)
        )
      }));
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  },

  deleteComment: async (courseId, lessonSlug, commentId) => {
    try {
      await deleteComment(courseId, lessonSlug, commentId);
      set(state => ({
        comments: state.comments.filter(comment => comment.id !== commentId)
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  }
}));

export default useCommentStore;
