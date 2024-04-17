import Cookies from "js-cookie";

export async function PatchComment(course_slug, lesson_slug, description, id) {
  const url = `http://127.0.0.1:8000/api/v1/course/${course_slug}${lesson_slug}/comments/${id}/`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${Cookies.get("access_token")}`
    },
    body: JSON.stringify({
      body: description
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error submitting review: ${errorText}`);
  }

  console.log("Review submitted successfully!");

  return response.json();
}
