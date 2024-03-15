import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import isAuthenticatedAtom from "./atoms/isAuthenticatedAtom";
import Courses from "./pages/Courses";
import { Layout } from "./pages/Layout";

function App() {
  const user = useRecoilValue(isAuthenticatedAtom);
  return (
    <Container
      maxW={{
        base: "100vw",
      }}
    >
      <Routes>
        <Route path="/" element={user ? <Layout /> : <Navigate to="/auth" />}>
          <Route index element={<HomePage />} />
          <Route path="/courses" element={<Courses />} />
        </Route>
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Container>
  );
}

export default App;
