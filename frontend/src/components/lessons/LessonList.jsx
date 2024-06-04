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
  useColorModeValue
} from "@chakra-ui/react";
import { NavLink, useParams } from "react-router-dom";
import { GoVideo } from "react-icons/go";
import { MdOutlineArticle } from "react-icons/md";
import { useFetchData } from "../../requests/FetchData";
import { useEffect, useState } from "react";
import useCourseStore from "../../store/CourseStore";

function LessonList() {
  const { id, lessonSlug } = useParams();
  const courseDetailData = useFetchData("course", id);

  const { defaultSectionIndex, setDefaultSectionIndex, setCourseDetailData } =
    useCourseStore();

  const [accordionIndex, setAccordionIndex] = useState([]);

  useEffect(() => {
    if (courseDetailData) {
      setCourseDetailData(courseDetailData);
      const sectionIndex = courseDetailData.course.sections.findIndex(
        (section) =>
          section.lessons.some((lesson) => lesson.slug === lessonSlug)
      );
      setDefaultSectionIndex(sectionIndex);
      setAccordionIndex([sectionIndex]);
    }
  }, [
    courseDetailData,
    lessonSlug,
    setCourseDetailData,
    setDefaultSectionIndex
  ]);

  if (defaultSectionIndex === null) {
    return null;
  }

  return (
    <div>
      <Box bg={useColorModeValue("white", "gray.dark")}>
        <Accordion
          allowMultiple
          w={"full"}
          minW={300}
          index={accordionIndex}
          onChange={setAccordionIndex}
        >
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
                </AccordionButton>
              </h2>
              <AccordionPanel
                mt={2}
                pl={5}
                display={"flex"}
                flexDir={"column"}
                gap={5}
                className="accordion-panel"
              >
                {section.lessons.map((lesson, lessonIndex) => (
                  <Box
                    key={lessonIndex}
                    _hover={{ color: useColorModeValue("tomato", "red") }}
                  >
                    <NavLink
                      to={`/courses/${courseDetailData?.course.slug}/${lesson.slug}`}
                      activeClassName="active"
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
