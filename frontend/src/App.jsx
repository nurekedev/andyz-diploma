import { Container} from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/PasswordPage";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import isAuthenticatedAtom from "./atoms/isAuthenticatedAtom";
import NavBar from "./components/NavBar";

function App() {
  const user = useRecoilValue(isAuthenticatedAtom);
  return (
    <Container
      maxW={{
        base: "100vw",
        xl: "1200px"
      }}
    >
      {user && <NavBar />}

        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/profile/password" element={<UserPage />} />
        </Routes>
    </Container>
  );
}

export default App;
