import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/header/Sidebar";
import MobileCourseMenu from "../../components/course/MobileCourseMenu";

const CourseDetailPage = () => {
  return (
    <Box
      display={"flex"}
      m={{
        md: "0 30px",
        lg: 10,
        xl: "0 auto 50px"
      }}
      gap={5}
      maxWidth={1200}
      borderRadius={10}
    >
      <Box
        as="aside"
        position="sticky"
        top={"30px"}
        height="30vh"
        borderRadius="10px"
        display={{base: "none", md: "block"}}
      >
        <Sidebar />
      </Box>
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        p={"20px"}
        borderRadius={10}
        ml={2}
        maxW={850}
        overflow={"overlay"}
        w={"100%"}
      >
        <Outlet />
      </Box>
      <MobileCourseMenu />
    </Box>
  );
};

export default CourseDetailPage;
