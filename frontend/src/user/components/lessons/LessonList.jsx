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
import { useEffect, useState } from "react";
import useCourseStore from "../../../store/CourseStore";
import useFetchData from "../../../services/api";

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

  const accordionButtonBg = useColorModeValue("gray.400", "gray.300");
  const accordionButtonColor = useColorModeValue("white", "gray.800");
  const accordionButtonExpandedBg = useColorModeValue("gray.800", "gray.600");
  const accordionButtonExpandedColor = useColorModeValue("white", "gray.300");
  const accordionButtonHoverBg = useColorModeValue("gray.700", "gray.700");
  const accordionButtonHoverColor = "gray.300";
  const boxBg = useColorModeValue("white", "gray.dark");

  if (defaultSectionIndex === null) {
    return null;
  }

  return (
    <div>
      <Box bg={boxBg}>
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
                  bg={accordionButtonBg}
                  color={accordionButtonColor}
                  _expanded={{
                    bg: accordionButtonExpandedBg,
                    color: accordionButtonExpandedColor
                  }}
                  _hover={{
                    bg: accordionButtonHoverBg,
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
                    _hover={{ color: accordionButtonHoverColor }}
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
