/* eslint-disable react-hooks/rules-of-hooks */
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  AccordionIcon,
  Tag,
  TagLabel,
  useColorModeValue,
  CircularProgress
} from "@chakra-ui/react";
import {  NavLink, useParams } from "react-router-dom";
import { useDetailCourseData } from "../../requests/CourseDetail";
import { GoVideo } from "react-icons/go";
import { MdOutlineArticle } from "react-icons/md";

function LessonList() {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);
  return (
    <div>
      <Box borderRadius={20}>
        <Accordion allowMultiple w={"full"} minW={330}>
          {courseDetailData?.course.sections.map((section, index) => (
            <AccordionItem key={index}>
              <h2>
                <AccordionButton
                  bg={useColorModeValue("gray.400", "gray.300")}
                  color={useColorModeValue("white", "gray.800")}
                  _expanded={{
                    bg: useColorModeValue("gray.800", "gray.600"),
                    color: useColorModeValue("white", "gray.300")
                  }}
                  _hover={{
                    bg: useColorModeValue("gray.700", "gray.700"),
                    color: "gray.300"
                  }}
                  fontSize={20}
                  fontWeight={"bold"}
                >
                  <AccordionIcon mr={2} />
                  <Box as="span" flex="1" textAlign="left">
                    {section.title}
                  </Box>
                  <CircularProgress
                    value={80}
                    color="orange.400"
                    thickness="6px"
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pl={10}
                display={"flex"}
                flexDir={"column"}
                gap={3}
                className="accordion-panel"
              >
                {/* Проходимся по урокам внутри секции */}
                {section.lessons.map((lesson, lessonIndex) => (
                  <Box
                    key={lessonIndex}
                    _hover={{ color: useColorModeValue("tomato", "red") }}
                  >
                    <NavLink
                      to={`/courses/${courseDetailData?.course.slug}/${lesson.slug}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 18
                      }}
                    >
                      <Box w={5}>
                        {lesson?.lesson_type === "article" ? (
                          <MdOutlineArticle />
                        ) : (
                          <GoVideo />
                        )}
                      </Box>
                      {lesson.title}
                      <Tag
                        size={"md"}
                        borderRadius="full"
                        variant="solid"
                        colorScheme="green"
                      >
                        <TagLabel>done</TagLabel>
                      </Tag>
                    </NavLink>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </div>
  );
}

export default LessonList;

