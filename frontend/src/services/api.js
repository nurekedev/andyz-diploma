import axiosInstance from "./axiosInstance";

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get(`auth/users/me`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};

export const fetchComments = async (courseId, lessonSlug) => {
  try {
    const response = await axiosInstance.get(
      `/course/${courseId}${lessonSlug}/comments/`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
};

export const addComment = async (courseId, lessonSlug, body) => {
  try {
    const response = await axiosInstance.post(
      `/course/${courseId}${lessonSlug}/comments/`,
      { body }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
  }
};

export const updateComment = async (courseId, lessonSlug, commentId, body) => {
  try {
    const response = await axiosInstance.patch(
      `/course/${courseId}${lessonSlug}/comments/${commentId}/`,
      { body }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update comment:", error);
    throw error;
  }
};

export const deleteComment = async (courseId, lessonSlug, commentId) => {
  try {
    await axiosInstance.delete(
      `/course/${courseId}${lessonSlug}/comments/${commentId}/`
    );
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};

export const fetchReviews = async courseId => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/review/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    throw error;
  }
};

export const addReview = async (courseId, rating, description) => {
  try {
    const response = await axiosInstance.post(`/course/${courseId}/review/`, {
      rating,
      description
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add review:", error);
    throw error;
  }
};

export const updateReview = async (
  courseSlug,
  reviewId,
  rating,
  description
) => {
  try {
    const response = await axiosInstance.patch(
      `/course/${courseSlug}/review/${reviewId}/`,
      { rating, description }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update review:", error);
    throw error;
  }
};

export const deleteReview = async (courseSlug, reviewId) => {
  try {
    await axiosInstance.delete(`/course/${courseSlug}/review/${reviewId}/`);
  } catch (error) {
    console.error("Failed to delete review:", error);
    throw error;
  }
};
