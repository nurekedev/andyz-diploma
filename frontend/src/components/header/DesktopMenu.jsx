import { Box, Container, HStack, Image, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaRegMoon } from "react-icons/fa";
import { TiAdjustBrightness } from "react-icons/ti";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

const DesktopMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        m={"auto"}
        p={4}
        mb={6}
        display={"flex"}
      >
        <Container
          maxW={"100vw"}
          justifyContent={"space-between"}
          display={"flex"}
        >
          <Link to={"/"}>
            <Image
              src={"/logo.png"}
              alt={"logo"}
              height={"50px"}
              objectFit={"cover"}
            />
          </Link>
          <HStack gap={5}>
            {colorMode === "dark" ? (
              <TiAdjustBrightness onClick={toggleColorMode} fontSize={24} />
            ) : (
              <FaRegMoon onClick={toggleColorMode} fontSize={24} />
            )}
            <Link to={"/"} activeClassName={"active"}>
              My Account
            </Link>
            <Link to={"/courses"}>My Courses</Link>
            <LogoutButton />
          </HStack>
        </Container>
      </Box>
    </div>
  );
}

export default DesktopMenu