import { Container } from "@chakra-ui/react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import Header from './components/Header'
import { HomePage } from "./pages/HomePage";
import { AuthPage } from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import { LogoutButton } from "./components/LogoutButton";
import isAuthenticatedAtom from "./atoms/isAuthenticatedAtom";


function App() {
  const user = useRecoilValue(isAuthenticatedAtom);
  console.log(user);
  return (
    <Container maxW="700px">
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
        <Route path="/:username" element={<UserPage />} />
      </Routes>

      {user && <LogoutButton />}
    </Container>
  );
}

export default App
