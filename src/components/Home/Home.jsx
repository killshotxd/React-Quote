import { Button } from "@chakra-ui/react";
import React from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
const Home = (props) => {
  const isAuth = props.auth ? true : false;
  const navigate = useNavigate();

  const handleNextBtnClick = () => {
    if (isAuth) navigate("/account");
    else navigate("/login");
  };

  return (
    <div>
      Home
      <Button onClick={handleNextBtnClick}>
        {isAuth ? "Login" : "SignUp"}
        <ArrowRight />
      </Button>
    </div>
  );
};

export default Home;
