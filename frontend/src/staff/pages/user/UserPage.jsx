import {
  Box,
  Button,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from "@chakra-ui/react";
import UserProfileHeader from "../../components/user/UserProfileHeader";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../../services/api";
import Records from "../records/Records";
import Markers from "../markers/Markers";
import { MdModeEditOutline } from "react-icons/md";
import Enrollments from "../enrollments/Enrollments"
const UserPage = () => {
  const { userId } = useParams();
  const userData = useFetchData("/cm-users/custom-users", userId);

  return (
    <Box maxW={1200} m={"auto"}>
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        p={4}
        mt={5}
        borderRadius={10}
      >
        <HStack alignItems={"center"} mb={10}>
          <Button as={Link} to={"/users"}>
            Back to user list
          </Button>
          <Button ml={"auto"}>
            <MdModeEditOutline />
          </Button>
        </HStack>
        <UserProfileHeader user={userData} />
      </Box>
      <Box
        bg={useColorModeValue("white", "gray.dark")}
        p={4}
        mt={5}
        borderRadius={10}
      >
        <Tabs>
          <TabList>
            <Tab>Records</Tab>
            <Tab>Markers</Tab>
            <Tab>Enrollments</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Records />
            </TabPanel>
            <TabPanel>
              <Markers />
            </TabPanel>
            <TabPanel>
              <Enrollments />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserPage;
