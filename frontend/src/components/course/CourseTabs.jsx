import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import LessonList from '../lessons/LessonList';

export default function CourseTabs() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Lessons</Tab>
          <Tab>Comments</Tab>
          <Tab>Reviews</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <LessonList />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel p={0}>
            woifjwiujf
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
