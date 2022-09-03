import { Button } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { signOut } from "firebase/auth";
import React from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import styles from "./Home.module.css";
const Home = (props) => {
  const isAuth = props.auth ? true : false;
  const navigate = useNavigate();

  const handleNextBtnClick = () => {
    if (isAuth) navigate("/account");
    else navigate("/login");
  };

  const handleLogOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headerLogo}>Quoter</h2>
          <div className={styles.headerBtn}>
            <Button
              colorScheme="pink"
              variant="link"
              onClick={handleNextBtnClick}
            >
              {isAuth ? "Manage your Quotes" : "SignUp"}
            </Button>
            {isAuth ? (
              <Button colorScheme="pink" variant="link" onClick={handleLogOut}>
                Logout
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* Header End */}

        <div className={styles.bodyContainer}>
          <p>All Quotes</p>
        </div>
      </div>
    </>
  );
};

export default Home;
