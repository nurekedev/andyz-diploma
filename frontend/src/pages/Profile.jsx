import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Input,
  useColorModeValue
} from "@chakra-ui/react";
import { useUserData } from "../token/UserData"; 
const Profile = () => {
  const userData = useUserData();

  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"100%"}
        borderRadius={10}
        bg={useColorModeValue("white", "gray.dark")}
        p={"20px"}
              gap={10}
              pb={10}
      >
        <Heading fontSize={25}>Basic Information</Heading>
        <Divider />
        <HStack gap={"20px"}>
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.first_name}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.last_name}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
        </HStack>
        <HStack gap={"20px"}>
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.address_line}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.date_of_birth}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
        </HStack>
        <HStack gap={"20px"}>
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.phone_number}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
          <Input
            fontSize={20}
            p={6}
            color={useColorModeValue("gray.dark", "white")}
            placeholder={userData?.email}
            _placeholder={{ color: "inherit" }}
            pointerEvents="none"
          />
        </HStack>
        <Button>Save changes</Button>
      </Box>
    </>
  );
};

export default Profile;
