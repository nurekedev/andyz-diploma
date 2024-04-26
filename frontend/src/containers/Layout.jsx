import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import { Box } from "@chakra-ui/react";

const Layout = () => {
  return (
    <Box padding={0}>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export { Layout };
