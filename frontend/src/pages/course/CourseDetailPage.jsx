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
      maxWidth={1400}
      borderRadius={10}
    >
      <Sidebar />
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        p={"10px"}
        borderRadius={10}
        ml={2}
        w={"100%"}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CourseDetailPage;
