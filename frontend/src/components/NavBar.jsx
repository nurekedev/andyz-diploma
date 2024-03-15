import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Text,
  useColorMode,
  useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { TiAdjustBrightness } from "react-icons/ti";
import { FaRegMoon } from "react-icons/fa";

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowSize.width < 600) {
    return (
      <Box textAlign={"end"}>
        <Button colorScheme="blue" onClick={onOpen} m={5}>
          Menu
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody display={"flex"} flexDir={"column"} gap={5}>
              <Button>
                <Link to={"/"}>My Account</Link>
              </Button>
              <Button>
                <Link to={"/courses"}>My Courses</Link>
              </Button>
              <LogoutButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  } else {
    return (
      <Box
        justifyContent={"space-between"}
        m={"auto"}
        mt={6}
        mb={6}
        display={"flex"}
        maxW={1400}
      >
        <Text fontWeight={"bold"} fontSize={40}>
          ANDYZ
        </Text>
        <HStack>
          {colorMode === "dark" ? (
            <TiAdjustBrightness onClick={toggleColorMode} fontSize={24} />
          ) : (
            <FaRegMoon onClick={toggleColorMode} fontSize={24} />
          )}
          <Link to={"/"}>My Account</Link>
          <Link to={"/courses"}>My Courses</Link>
          <LogoutButton />
        </HStack>
      </Box>
    );
  }
};

export default NavBar;
