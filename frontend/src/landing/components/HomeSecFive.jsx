import { Button, Input, Textarea, useToast } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { API_2 } from "../../services/functions";
const HomeSecFive = () => {
  const toast = useToast();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    question_text: ""
  });

  const handleContact = async (inputs) => {
    try {
      console.log(inputs);
      const response = await axios.post(`${API_2}/submit_contact/`, inputs);
      if (response.status === 200) {
        toast({
          title: "Message created.",
          description: "Message has been successfully created",
          status: "success",
          duration: 3000,
          isClosable: true
        });
        setInputs({
          date: "",
          title: "",
          description: ""
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home-5">
      <div className="container">
        <div className="left-2">
          <h1>Have Questions?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
          <ul>
            <li>
              <p>Emails</p>
              <span>
                29622@iitu.edu.kz <br />
                29132@iitu.edu.kz <br />
                29600@iitu.edu.kz
              </span>
            </li>
            <li>
              <p>Phone</p>

              <span>+7 747 041 5206</span>
            </li>
            <li>
              <p>location</p>

              <span>Almaty. Manas st. 31</span>
            </li>
          </ul>
        </div>
        <div className="right-2">
          <Input
            placeholder="Enter your name"
            type="text"
            _placeholder={{ color: "black" }}
            variant={"flushed"}
            value={inputs.name}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                name: e.target.value
              }));
            }}
          />
          <Input
            variant={"flushed"}
            placeholder="Enter your email"
            type="email"
            _placeholder={{ color: "black" }}
            value={inputs.email}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                email: e.target.value
              }));
            }}
          />
          <Textarea
            placeholder="Enter your message"
            _placeholder={{ color: "black" }}
            resize={"none"}
            h={"full"}
            value={inputs.question_text}
            onChange={(e) => {
              setInputs((prev) => ({
                ...prev,
                question_text: e.target.value
              }));
            }}
          />
          <Button
            py={2}
            onClick={() => {
              handleContact(inputs);
            }}
          >
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSecFive;
