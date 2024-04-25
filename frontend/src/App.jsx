import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/profile/HomePage";
import { AuthPage } from "./containers/AuthPage";
import PasswordPage from "./pages/auth/PasswordPage";
import Courses from "./pages/course/Courses";
import Review from "./pages/review/Review";
import { Layout } from "./containers/Layout";
import CourseDetailPage from "./containers/CourseDetailPage";
import LessonPage from "./containers/LessonPage";
import CourseInfo from "./components/course/CourseInfo";
import LessonList from "./components/lessons/LessonList";
import CourseComment from "./pages/course/CourseComment";
import useAuthStore from "./store/AuthStore";

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
        </Route>
        <Route
          path="/auth"
          element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/reset-password" element={<PasswordPage />} />
      </Routes>
    </Container>
  );
}

export default App;
