import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";
import useAuthStore from "../../../store/AuthStore";

const MobileMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isStaff = useAuthStore((state) => state.isStaff);
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bg={useColorModeValue("white", "gray.dark")}
        mb={10}
      >
        <Link to={"/"}>
          <Image src={"/logo.png"} height={"70px"} objectFit={"cover"} />
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
              {isStaff ? (
                <Button onClick={onClose}>
                  <Link to={"/courses"}>My Courses</Link>
                </Button>
              ) : (
                <Button onClick={onClose}>
                  <Link to={"/users"}>Users</Link>
                </Button>
              )}

              <LogoutButton />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </div>
  );
};

export default MobileMenu;
