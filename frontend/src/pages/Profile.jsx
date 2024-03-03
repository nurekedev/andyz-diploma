import {
  Box,
  Divider,
  FormControl,
  FormLabel,
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
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              value={userData?.first_name}
              readonly="readonly"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              placeholder={userData?.last_name}
              _placeholder={{ color: "inherit" }}
              readonly="readonly"
            />
          </FormControl>
        </Box>
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              placeholder={userData?.address_line}
              _placeholder={{ color: "inherit" }}
              readonly="readonly"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Date of birth</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              placeholder={userData?.date_of_birth}
              _placeholder={{ color: "inherit" }}
              readonly="readonly"
            />
          </FormControl>
        </Box>
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              placeholder={userData?.phone_number}
              _placeholder={{ color: "inherit" }}
              readonly="readonly"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              fontSize={20}
              p={6}
              color={useColorModeValue("gray.dark", "white")}
              placeholder={userData?.email}
              _placeholder={{ color: "inherit" }}
              readonly="readonly"
            />
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
