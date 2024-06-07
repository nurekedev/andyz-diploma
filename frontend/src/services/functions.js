export const API = "https://api.andyz.kz/api/v1";


export function findAdjacentLessons(course, lessonSlug) {
  let previousLesson = null;
  let nextLesson = null;
  const sections = course?.course?.sections;

  if (!sections) {
    return { previousLesson, nextLesson };
  }

  for (let i = 0; i < sections.length; i++) {
    const lessons = sections[i].lessons;
    for (let j = 0; j < lessons.length; j++) {
      if (lessons[j].slug === lessonSlug) {
        if (j > 0) {
          previousLesson = lessons[j - 1]?.slug;
        } else if (i > 0) {
          const prevSection = sections[i - 1];
          previousLesson = prevSection.lessons[prevSection.lessons.length - 1]?.slug;
        }

        if (j < lessons.length - 1) {
          nextLesson = lessons[j + 1]?.slug;
        } else if (i < sections.length - 1) {
          const nextSection = sections[i + 1];
          if (nextSection && nextSection.lessons) {
            nextLesson = nextSection.lessons[0]?.slug;
          }
        }

        return { previousLesson, nextLesson };
      }
    }
  }
  return { previousLesson, nextLesson };
}

export function findSectionSlug(course, lessonSlug) {
    // Мапим секции в новый массив
    if (course?.course.sections) {
      const sections = course?.course?.sections.map(section => ({
        slug: section.slug,
        lessons: section.lessons
    }));

    // Ищем slug секции по slug лекции
    for (const section of sections) {
        if (section.lessons.some(lesson => lesson.slug === lessonSlug)) {
            return section.slug;
        }
    }
    }
    return null; // Return null if the lesson is not found
}