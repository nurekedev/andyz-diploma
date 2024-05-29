import { Box, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/header/Sidebar";

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
        as="aside" // Indicate this is an aside element for screen readers
        position="sticky" // Make the sidebar sticky
        top={"30px"} // Position it at the top of the viewport
        height="30vh" // Make it as tall as the viewport
        borderRadius="10px"
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
    </Box>
  );
};

export default CourseDetailPage;
