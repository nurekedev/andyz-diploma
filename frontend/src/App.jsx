import { Box, Container} from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/PasswordPage";
import Header from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import { LogoutButton } from "./components/LogoutButton";
import isAuthenticatedAtom from "./atoms/isAuthenticatedAtom";
import Sidebar from "./components/Sidebar";

function App() {
  const user = useRecoilValue(isAuthenticatedAtom);
  return (
    <Container
      maxW={{
        base: "100vw",
        xl: "1200px"
      }}
    >
      <Header />
      <Box display={"flex"} gap={10}>
        {user && <Sidebar />}
        
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
      </Box>
      {user && <LogoutButton />}
    </Container>
  );
}

export default App;
