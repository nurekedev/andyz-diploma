import { Box } from "@chakra-ui/react";
import  CourseMain  from "./CourseMain";
import { useParams } from "react-router-dom";
import { useDetailCourseData } from "../../requests/CourseDetail";

const CourseInfo = () => {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);
  console.log(courseDetailData);
  return (
    <>
      <Box display={"flex"} flexDir={"column"} p={"10px 20px"} maxH={"80vh"} overflow={"overlay"}>
        <CourseMain courseDetailData={courseDetailData} />
      </Box>
    </>
  );
}
export default CourseInfo;
