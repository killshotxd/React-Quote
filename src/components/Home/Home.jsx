import { Badge, Button } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { isSignInWithEmailLink, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ArrowRight, GitHub } from "react-feather";
import { useNavigate } from "react-router-dom";
import { auth, getAllQuotes } from "../../Firebase";
import Loader from "../Loader/Loader";
// import Body from "../Body/Body";
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

  const [quotesLoaded, setQuotesLoaded] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const fetchAllQuotes = async () => {
    const result = await getAllQuotes();
    setQuotesLoaded(true);

    if (!result) {
      return;
    }
    const tempQuotes = [];

    result.forEach((doc) => tempQuotes.push({ ...doc.data(), pid: doc.id }));

    setQuotes(tempQuotes);

    console.log([quotes]);
  };

  useEffect(() => {
    fetchAllQuotes();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.headerLogo}>
            <a href="https://github.com/killshotxd">
              <GitHub /> Quoter
            </a>
          </h2>
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

        {
          <div className={styles.quotesBody}>
            {quotes && quotesLoaded ? (
              quotes.length > 0 ? (
                quotes.map((item) => (
                  <div className={styles.quoteContainer} key={item.pid}>
                    <p className={styles.name}>
                      <Badge variant="subtle" colorScheme="pink">
                        {item.name}
                      </Badge>
                    </p>

                    <p className={styles.desc}>{item.description}</p>

                    <p className={styles.date}>{item.currDate}</p>
                  </div>
                ))
              ) : (
                <p>No Quotes.... Create a new One Now by SignUp !</p>
              )
            ) : (
              <Loader />
            )}
          </div>
        }
      </div>
    </>
  );
};

export default Home;
