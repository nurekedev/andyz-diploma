import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import { TiAdjustBrightness } from "react-icons/ti";
import { FaRegMoon } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
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
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={useColorModeValue("white", "gray.dark")}
        mb={10}
      >
        <Link to={"/"}>
          <Image
            src={"/logo.png"}
            height={"60px"}
            objectFit={"cover"}
            w={250}
          />
        </Link>
        <Button onClick={onOpen} m={5}>
          <AiOutlineMenu />
        </Button>
        <Drawer onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
            <DrawerBody display={"flex"} flexDir={"column"} gap={5}>
              <Button onClick={onClose}>
                <Link to={"/"}>My Account</Link>
              </Button>
              <Button onClick={onClose}>
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
        // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("white", "gray.dark")}
        m={"auto"}
        p={6}
        mb={6}
        display={"flex"}
      >
        <Container
          maxW={1300}
          justifyContent={"space-between"}
          display={"flex"}
        >
          <Link to={"/"}>
            <Image
              src={"/logo.png"}
              alt={"logo"}
              height={"80px"}
              objectFit={"cover"}
              w={250}
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
    );
  }
};

export default NavBar;
