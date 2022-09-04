import { Badge, Button } from "@chakra-ui/react";
import { async } from "@firebase/util";
import { isSignInWithEmailLink, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { auth, getAllQuotes } from "../../Firebase";
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

        {
          <div className={styles.quotesBody}>
            {quotes.map((item) => (
              <div className={styles.quoteContainer} key={item.pid}>
                <p className={styles.title}>{item.title.toUpperCase()}</p>
                <p className={styles.name}>
                  <Badge variant="subtle" colorScheme="pink">
                    {item.name}
                  </Badge>
                </p>

                <p className={styles.desc}>{item.description}</p>
              </div>
            ))}
          </div>
        }
      </div>
    </>
  );
};

export default Home;
