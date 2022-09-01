import React, { useState } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { signOut } from "firebase/auth";
import { Button } from "@chakra-ui/react";

const Account = (props) => {
  const userDetails = props.userDetails;
  const isAuth = props.auth;

  const [userProfileValues, setUserProfileValues] = useState({
    name: userDetails.name || "",
  });

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <p style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            Back
          </p>
        </div>
        <div className={styles.welcome}>
          <p>
            Welcome <span>{userDetails.name}</span>
          </p>
        </div>
        <div className={styles.right}>
          <p style={{ cursor: "pointer" }} onClick={handleLogOut}>
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Account;
