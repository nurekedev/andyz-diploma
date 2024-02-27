/* eslint-disable react-hooks/rules-of-hooks */
import { HStack, IconButton, Text, VStack, useColorModeValue} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiUser, CiUnlock } from "react-icons/ci";
import { PiGraduationCap } from "react-icons/pi";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";
import { MdOutlineMenuOpen } from "react-icons/md";
const Sidebar = () => {
  const [navSize, changeNavSize] = useState("lg");
  const data = [
    { id: 1, path: "/", icon: <CiUser fontSize={30} />, text: "Profile" },
    {
      id: 2,
      path: "/password",
      icon: <CiUnlock fontSize={30} />,
      text: "password"
    },
    {
      id: 3,
      path: "/",
      icon: <PiGraduationCap fontSize={30} />,
      text: "Item 3"
    }
  ];

  return (
    <VStack
      m={0}
      gap={0}
      h={400}
      w={navSize === "lg" ? "250px" : "100px"}
      bg={useColorModeValue("white", "gray.dark")}
      alignItems={"start"}
      p={"20px 0"}
      borderRadius={20}
      transform={"auto"}
    >
      <IconButton
        textAlign={"end"}
        bg={useColorModeValue("white", "gray.dark")}
        fontSize={30}
        m={7}
        icon={navSize === "lg" ? <MdOutlineMenuOpen /> : <MdOutlineMenu />}
        onClick={() => changeNavSize(navSize === "lg" ? "md" : "lg")}
      />
      {data.map((item) => (
        <Link key={item.id} to={item.path} style={{ width: "100%" }}>
          <HStack
            width="100%"
            transition="all 0.3s"
            bg={useColorModeValue("white", "gray.dark")}
            p={"10px 30px"}
            textAlign={navSize === "lg" ? "end" : "center"}
            _hover={{
              transition: "all 0.3s ",
              bg: useColorModeValue("gray.300", "gray.700"),
              color: "white"
            }}
          >
            {item.icon}
            <Text fontSize="lg" display={navSize === "lg" ? "block" : "none"}>
              {item.text}
            </Text>
          </HStack>
        </Link>
      ))}
    </VStack>
  );
};

export default Sidebar;
