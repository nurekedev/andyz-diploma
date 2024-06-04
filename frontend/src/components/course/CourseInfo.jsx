import { Box } from "@chakra-ui/react";
import CourseMain from "./CourseMain";
import { useParams } from "react-router-dom";
import CourseMainSkeleton from "./CourseMainSkeleton";
import { useFetchData } from "../../requests/FetchData";

const CourseInfo = () => {
  const { id } = useParams();
  const courseDetailData = useFetchData("course", id);
  return (
    <Box display={"flex"} flexDir={"column"}>
      {courseDetailData ? (
        <CourseMain courseDetailData={courseDetailData} />
      ) : (
        <CourseMainSkeleton />
      )}
    </Box>
  );
};
export default CourseInfo;
