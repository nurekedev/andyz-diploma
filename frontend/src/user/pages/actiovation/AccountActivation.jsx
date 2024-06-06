import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

const AccountActivation = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");
  const token = searchParams.get("token");
  const [activationStatus, setActivationStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await axiosInstance.post("/auth/users/activation/", {
          uid,
          token
        });
        if (response.ok) {
          console.log("success");
        }
        setActivationStatus("success");
      } catch (error) {
        console.log(error);
        setActivationStatus("failure");
      }
    };

    activateAccount();
  }, [uid, token]);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      h={"100vh"}
    >
      {activationStatus === "success" ? (
        <Box>
          <Heading fontSize={24} textAlign={"center"}>
            Your account has been successfully activated!
          </Heading>
          <Button
            onClick={() => navigate("/")}
            bg={"green.500"}
            color={"white"}
            _hover={{ bg: "green.700" }}
          >
            Back to main page
          </Button>
        </Box>
      ) : activationStatus === "failure" ? (
        <VStack>
          <Heading fontSize={24} textAlign={"center"}>
            An error occurred <br /> while activating the account
          </Heading>
          <Button
            onClick={() => navigate("/")}
            bg={"red.500"}
            color={"white"}
            _hover={{ bg: "red.700" }}
          >
            Back to main page
          </Button>
        </VStack>
      ) : (
        <h1>Активация аккаунта...</h1>
      )}
    </Box>
  );
};

export default AccountActivation;
