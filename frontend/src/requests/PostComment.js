import Cookies from "js-cookie";

export async function PostComment(course_slug, lesson_slug, comment) {
  console.log(course_slug, lesson_slug);
  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/course/${course_slug}${lesson_slug}/comments/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${Cookies.get("access_token")}`
      },
      body: JSON.stringify({
        body: comment,
      })
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Error submitting review: ${errorData.message}`);
  }

  console.log("Comment submitted successfully!");
  return response.json();
}