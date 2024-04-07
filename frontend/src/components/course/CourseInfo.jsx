import { Box } from "@chakra-ui/react";
import  CourseMain  from "./CourseMain";
import CourseTabs  from "./CourseTabs";

export const CourseInfo = ({ courseDetailData }) => {
  return (
    <>
      <Box display={"flex"} flexDir={"column"}>
        <CourseMain courseDetailData={courseDetailData} />
        <CourseTabs />
      </Box>
    </>
  );
}

