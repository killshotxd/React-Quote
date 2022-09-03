import React, { useState } from "react";
import { useEffect } from "react";
import { getAllQuotes } from "../../Firebase";
import styles from "./Body.module.css";
const Body = () => {
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
  };

  useEffect(() => {
    fetchAllQuotes;
  }, []);

  return (
    <div>
      {quotes.map((item) => {
        <div>
          <p>{item.title}</p>
        </div>;
      })}
    </div>
  );
};

export default Body;
