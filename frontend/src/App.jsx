import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./user/pages/profile/HomePage";
import { AuthPage } from "./user/pages/auth/AuthPage";
import PasswordPage from "./user/pages/auth/PasswordPage";
import Courses from "./user/pages/course/Courses";
import { Layout } from "./user/pages/Layout";
import CourseDetailPage from "@pages/course/CourseDetailPage";
import LessonPage from "@pages/lesson/LessonPage";
import CourseInfo from "@components/course/CourseInfo";
import LessonList from "@components/lessons/LessonList";
import CourseComment from "@components/comment/CourseComment";
import useAuthStore from "./store/AuthStore";
import Review from "@features/review/Review";
import Users from "./staff/pages/users/Users";
import UserPage from "./staff/pages/user/UserPage";
import AccountActivation from "./user/pages/actiovation/AccountActivation";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Container maxWidth={"100vw"} padding={0}>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <Navigate to="/auth" />}
        >
          <Route index element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetailPage />}>
            <Route index element={<CourseInfo />} />
            <Route path="content" element={<LessonList />} />
            <Route path="review" element={<Review />} />
            <Route path="comment" element={<CourseComment />} />
          </Route>
          <Route path="/courses/:id/:lessonSlug" element={<LessonPage />} />

          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserPage />} />
        </Route>
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/reset-password" element={<PasswordPage />} />
        <Route path="/activate" element={<AccountActivation />} />
      </Routes>
    </Container>
  );
}

export default App;
