import axiosInstance from "./axiosInstance";
import { useEffect, useState } from "react";


export const useFetchData = (pre_slug, slug) => {
  const [data, setData] = useState(null);

  useEffect(
    () => {
      const fetchDataEffect = async () => {
        try {
          const result = await axiosInstance.get(`${pre_slug}/${slug}`);
          setData(result.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchDataEffect();
    },
    [pre_slug, slug]
  );

  return data;
};

export default useFetchData;

export const deleteRecordApi = async ({ record_id, user_id }) => {
  try {
    const response = await axiosInstance.delete(
      `/cm-users/records/${user_id}`,
      {
        data: {
          record_id: record_id
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete record:", error);
    throw error;
  }
};

export const trackAndMarkLesson = async (courseSlug, sectionSlug, lessonSlug) => {
  const trackStartedUrl = `/progress/track-started/${courseSlug}/${sectionSlug}/${lessonSlug}/`;
  const markAsDoneUrl = `/progress/mark-as-done/${courseSlug}/${sectionSlug}/${lessonSlug}/`;

  try {
    // Отправка первого запроса
    const trackStartedResponse = await axiosInstance.post(trackStartedUrl);
    console.log("Track Started Response:", trackStartedResponse.data);

    // Отправка второго запроса после успешного выполнения первого
    const markAsDoneResponse = await axiosInstance.post(markAsDoneUrl);
    console.log("Mark As Done Response:", markAsDoneResponse.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteMarkerApi = async ({ marker_id, user_id }) => {
  console.log("deleteMarkerApi", marker_id, user_id);
  try {
    const response = await axiosInstance.delete(
      `/cm-users/markers/${user_id}`,
      {
        data: {
          marker_id: marker_id
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to delete record:", error);
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await axiosInstance.get(`auth/users/me`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
export const fetchEnrollments = async userId => {
  try {
    const response = await axiosInstance.get(`/cm-users/enrollments/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
export const createUser = async credentials => {
  try {
    const response = await axiosInstance.post(
      "cm-users/custom-users/",
      credentials
    );
    return response;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
};
export const fetchCourseData = async courseId => {
  try {
    const response = await axiosInstance.get(`/course/${courseId}/`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
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
    return {
      error: true,
      message: error.response ? error.response.status : "Unknown error"
    };
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
