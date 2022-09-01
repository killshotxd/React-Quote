import React, { useEffect, useState } from "react";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Auth from "./components/Auth/Auth";
import Account from "./components/Account/Account";
import { auth, getUserFromDb } from "./Firebase";
const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  const [userDetails, setUserDetails] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // ---------Function for userDetail fetch--------
  const fetchUserDetails = async (uid) => {
    const userDetails = await getUserFromDb(uid);
    setUserDetails(userDetails);
    setIsDataLoaded(true);
  };

  // --------UseEffect for detecting state change---
  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      if (!user) {
        setIsDataLoaded(true);
        setIsAuth(false);
        return;
      }

      setIsAuth(true);
      fetchUserDetails(user.uid);
    });

    return () => listener();
  }, []);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {!isAuth && (
            <>
              <Route path="/login" element={<Auth />} />
              <Route path="/signUp" element={<Auth signUp />} />
            </>
          )}
          <Route path="/account" element={<Account auth={isAuth} />} />
          <Route path="/" element={<Home auth={isAuth} />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
