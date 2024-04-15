import { Box } from "@chakra-ui/react";
import  CourseMain  from "./CourseMain";
import { useParams } from "react-router-dom";
import CourseMainSkeleton from "./skeleton/CourseMainSkeleton";
import { useFetchData } from "../../requests/FetchData";

const CourseInfo = () => {
  const { id } = useParams();
  const courseDetailData = useFetchData("course", id);
  return (
    <>
      <Box display={"flex"} flexDir={"column"} p={"10px 20px"} maxH={"80vh"} overflow={"overlay"}>
        {courseDetailData? <CourseMain courseDetailData={courseDetailData} /> : <CourseMainSkeleton />}
      </Box>
    </>
  );
}
export default CourseInfo;
