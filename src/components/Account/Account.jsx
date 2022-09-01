import React, { useState } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import { Select, Textarea } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Button, FormLabel, Input } from "@chakra-ui/react";

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

      <div className={styles.body}>
        <div className={styles.form}>
          <div className={styles.heading}> Create New Quote </div>
          <div className={styles.title}>
            <FormLabel>Title</FormLabel>
            <Input variant="filled" placeholder="Title for your Quote" />
          </div>
          <div className={styles.title}>
            <FormLabel>Written By</FormLabel>
            <Input variant="filled" placeholder="Name..." />
          </div>
          <div className={styles.title}>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="filled"
              placeholder="Enter Your Quote.."
            ></Textarea>
          </div>
          <div className={styles.title}>
            <FormLabel>Categories</FormLabel>
            <Select
              variant="filled"
              className={styles.select}
              placeholder="Select categories"
            >
              <option value="option1">Happy</option>
              <option value="option2">Sad</option>
              <option value="option3">Funny</option>
            </Select>
          </div>
          <div className={styles.btn}>
            <Button colorScheme="pink">Add</Button>
            <Button colorScheme="pink">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
