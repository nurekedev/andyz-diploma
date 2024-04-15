import { Box } from "@chakra-ui/react";
import  CourseMain  from "./CourseMain";
import { useParams } from "react-router-dom";
import { useDetailCourseData } from "../../requests/CourseDetail";
import CourseMainSkeleton from "./skeleton/CourseMainSkeleton";

const CourseInfo = () => {
  const { id } = useParams();
  const courseDetailData = useDetailCourseData(id);
  return (
    <>
      <Box display={"flex"} flexDir={"column"} p={"10px 20px"} maxH={"80vh"} overflow={"overlay"}>
        {courseDetailData? <CourseMain courseDetailData={courseDetailData} /> : <CourseMainSkeleton />}
      </Box>
    </>
  );
}
export default CourseInfo;
