import { Box } from "@chakra-ui/react";
import LessonMain from "../../components/lessons/LessonMain";
import LessonList from "../../components/lessons/LessonList";
import MobileLessonMenu from "../../components/lessons/MobileLessonMenu";

const LessonPage = () => {
  return (
    <Box maxW={1200} margin={"auto"}  borderRadius={10}>
      <MobileLessonMenu />
      <Box display={"flex"} gap={5}>
        <Box
          display={{
            base: "none",
            md: "block"
          }}
        >
          <LessonList />
        </Box>

        <LessonMain />
      </Box>
    </Box>
  );
};

export default LessonPage;
