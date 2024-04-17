/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Skeleton,
  useColorModeValue
} from "@chakra-ui/react";
const Profile = ({ userData }) => {
  return (
    <>
      <Box
        display={"flex"}
        flexDir={"column"}
        w={"100%"}
        maxWidth={1000}
        borderRadius={10}
        bg={useColorModeValue("white", "gray.dark")}
        p={"20px"}
        gap={10}
        pb={5}
        mb={10}
      >
        <Heading fontSize={25}>Basic Information</Heading>
        <Divider />
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            sm: "row",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>First Name</FormLabel>
            {userData ? (
              <Input
                fontSize={20}
                p={6}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.first_name}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            {userData ? (
              <Input
                fontSize={20}
                p={4}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.last_name}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>
        </Box>
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            sm: "row",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>Address</FormLabel>
            {userData ? (
              <Input
                fontSize={20}
                p={4}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.address_line}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Date of birth</FormLabel>
            {userData ? (
              <Input
                fontSize={20}
                p={4}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.date_of_birth}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>
        </Box>
        <Box
          gap={"20px"}
          display={"flex"}
          flexDir={{
            base: "column",
            sm: "row",
            md: "row"
          }}
        >
          <FormControl>
            <FormLabel>Phone Number</FormLabel>

            {userData ? (
              <Input
                fontSize={20}
                p={6}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.phone_number}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            {userData ? (
              <Input
                fontSize={20}
                p={6}
                color={useColorModeValue("gray.dark", "white")}
                value={userData?.email}
                _placeholder={{ color: "inherit" }}
                readonly="readonly"
              />
            ) : (
              <Skeleton height="40px" w={"full"} />
            )}
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
