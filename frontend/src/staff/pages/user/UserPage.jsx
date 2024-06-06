import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue
} from "@chakra-ui/react";
import UserProfileHeader from "../../components/user/UserProfileHeader";
import { useParams } from "react-router-dom";
import useFetchData from "../../../services/api";
import Records from "../records/Records";
import Enrollments from "../enrollments/Enrollments";

const UserPage = () => {
  const { userId } = useParams();
  const userData = useFetchData("/cm-users/custom-users", userId);

  return (
    <Box
      maxW={1200}
      m={"auto"}
      bg={useColorModeValue("white", "gray.dark")}
      p={4}
    >
      <Box>
        <UserProfileHeader user={userData} />
      </Box>
      <Box>
        <Tabs> 
          <TabList>
            <Tab>Enrolments</Tab>
            <Tab>Records</Tab>
            <Tab>Markers</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Box>
                <Enrollments />
              </Box>
            </TabPanel>
            <TabPanel>
              <Records />
            </TabPanel>
            <TabPanel>
              <Box>3</Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserPage;
