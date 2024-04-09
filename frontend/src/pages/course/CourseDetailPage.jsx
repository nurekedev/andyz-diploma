import { Box, useColorModeValue } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { CourseInfo } from "../../components/course/CourseInfo.JSX";
import { useDetailCourseData } from "../../requests/CourseDetail";
const CourseDetailPage = () => {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);

  return (
    <Box
      display={"flex"}
      m={{
        md: 20,
        lg: 20,
        xl: "0 auto 50px",
      }}
      maxWidth={1000}
      bg={useColorModeValue("white", "gray.dark")}
      p={5}
      borderRadius={10}
    >
        <CourseInfo courseDetailData={courseDetailData} />
    </Box>
  );
};

export default CourseDetailPage;
