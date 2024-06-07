import { Button, Input, Textarea } from "@chakra-ui/react";
const HomeSecFive = () => {
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
          />
          <Input
            variant={"flushed"}
            placeholder="Enter your phone number"
            type="tel"
            _placeholder={{ color: "black" }}
          />
          <Textarea
            placeholder="Enter your message"
                      _placeholder={{ color: "black" }}
                      resize={"none"}
            h={"full"}
                  />
                  <Button py={2}>Send message</Button>
        </div>
      </div>
    </div>
  );
};

export default HomeSecFive;
