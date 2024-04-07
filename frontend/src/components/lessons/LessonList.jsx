import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { useDetailCourseData } from "../../requests/CourseDetail";


function LessonList() {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);

  return (
    <div>
      <Accordion allowMultiple>
        {courseDetailData?.course.sections.map((section, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {section.title}
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel p={4}>
              {/* Проходимся по урокам внутри секции */}
              {section.lessons.map((lesson, lessonIndex) => (
                <Link
                  key={lessonIndex}
                  to={`/courses/${courseDetailData?.course.slug}/${lesson.slug}`}
                >
                  {/* Отображаем название урока */}
                  {lesson.title}
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default LessonList;

