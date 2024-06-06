import { Avatar, Box, Heading, Text } from "@chakra-ui/react";

const UserProfileHeader = ({ user }) => {
  return (
    <Box
      mb={10}
      display={"flex"}
      flexDir={{ base: "column", md: "row" }}
      alignItems={"center"}
      gap={5}
    >
      <Avatar src={user?.avatar} height={"full"} size="2xl" />
      <Box gap={5} display={{ base: "block", md: "flex" }}>
        <Box>
          <Box mb={4}>
            <Heading fontSize={12}>gender</Heading>
            <Text fontSize={{ base: 20, md: 22 }}>{user?.gender}</Text>
          </Box>
          <Box mb={4}>
            <Heading fontSize={12}>blood group</Heading>
            <Text fontSize={{ base: 20, md: 22 }}>{user?.blood_group}</Text>
          </Box>
        </Box>
        <Box>
          <Box mb={4}>
            <Heading fontSize={12}>full name</Heading>
            <Text fontSize={{ base: 20, md: 22 }}>
              {user?.first_name} {user?.last_name}
            </Text>
          </Box>
          <Box mb={4}>
            <Heading fontSize={12}>email</Heading>
            <Text fontSize={{ base: 20, md: 22 }}>{user?.email}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileHeader;
