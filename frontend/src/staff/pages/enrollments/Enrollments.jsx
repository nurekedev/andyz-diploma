import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import useFetchData, { fetchEnrollments } from "../../../services/api";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import OtherEnrollments from "../../components/enrollments/OtherEnrollments";

const Enrollments = () => {
  const { userId } = useParams();
  const [enrollments, setEnrollments] = useState([]);
  const courses = useFetchData("/course", "all-courses/");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const enrollmentSlugs = enrollments
    ? enrollments.map((enrollment) => enrollment.slug)
    : [];
  const courseSlugs = courses ? courses.map((course) => course.slug) : [];

  const commonSlugs = enrollmentSlugs.filter((slug) =>
    courseSlugs.includes(slug)
  );

  const availableCourses = courses
    ? courses.filter((course) => !commonSlugs.includes(course.slug))
    : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEnrollments(userId);
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to fetch enrollments:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleEnrollment = async () => {
    if (selectedCourse) {
      try {
        await axiosInstance.post(`cm-users/enrollments/${userId}`, {
          course_slug: selectedCourse
        });
      } catch (error) {
        console.error("Error enrolling course:", error);
      }
    } else {
      alert("Please select a course first.");
    }
  };

  return (
    <Box mt={10}>
      <Heading fontSize={32} mb={5}>
        {availableCourses.length > 0
          ? "Select Course"
          : "User is enrolled in all courses."}
      </Heading>
      <Divider mt={10} mb={5} />
      <HStack>
        <Menu>
          <MenuButton as={Button} isDisabled={availableCourses}>
            {availableCourses.length > 0 ? "Select Course" : "No courses"}
          </MenuButton>
          <MenuList>
            {availableCourses.map((course) => (
              <MenuItem
                key={course?.slug}
                onClick={() => setSelectedCourse(course?.slug)}
              >
                {course?.title}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <Button onClick={handleEnrollment} isDisabled={!selectedCourse}>
          Add Enrollment
        </Button>
      </HStack>
      <OtherEnrollments enrollments={enrollments} patientId={userId} />
    </Box>
  );
};

export default Enrollments;
