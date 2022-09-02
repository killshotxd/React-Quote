import React, { useState } from "react";
import styles from "./Account.module.css";
import { useNavigate } from "react-router-dom";
import { addQuoteInDb, auth } from "../../Firebase";
import { Select, Textarea } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { Button, FormLabel, Input } from "@chakra-ui/react";

const Account = (props) => {
  const userDetails = props.userDetails;
  const isAuth = props.auth;

  const [submitButtonDisabled, setSetSubmitButtonDisabled] = useState(false);

  const [values, setValues] = useState({
    name: userDetails.name || "",
    title: userDetails.title || "",
    writer: userDetails.name || "",
    description: userDetails.description || "",
    categories: userDetails.categories || "",
  });

  const handleLogOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSubmission = async () => {
    setSetSubmitButtonDisabled(true);
    await addQuoteInDb({ ...values });
    setSetSubmitButtonDisabled(false);
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
            <Input
              value={values.title}
              variant="filled"
              placeholder="Title for your Quote"
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className={styles.title}>
            <FormLabel>Written By</FormLabel>
            <Input
              value={values.writer}
              variant="filled"
              placeholder="Name..."
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  writer: event.target.value,
                }))
              }
            />
          </div>
          <div className={styles.title}>
            <FormLabel>Description</FormLabel>
            <Textarea
              variant="filled"
              placeholder="Enter Your Quote.."
              value={values.description}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            ></Textarea>
          </div>
          <div className={styles.title}>
            <FormLabel>Categories</FormLabel>
            <Select
              variant="filled"
              className={styles.select}
              placeholder="Select categories"
              value={values.categories}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  categories: event.target.value,
                }))
              }
            >
              <option value="option1">Happy</option>
              <option value="option2">Sad</option>
              <option value="option3">Funny</option>
            </Select>
          </div>
          <div className={styles.btn}>
            <Button
              onClick={handleSubmission}
              disabled={submitButtonDisabled}
              colorScheme="pink"
            >
              Add
            </Button>
            <Button colorScheme="pink">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
