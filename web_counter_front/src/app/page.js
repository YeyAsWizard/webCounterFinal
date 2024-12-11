"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [count, setCount] = useState(0);

  // Fetch the count from the API when the component mounts
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("http://localhost:8000/count/get");
        setCount(response.data); // Assuming the API returns just the count number
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchCount();
  }, []);

  // Function to update the count on the server
  const updateCountOnServer = async (newCount) => {
    try {
      await axios.patch(
        "http://localhost:8000/count/update",
        { count: newCount }, // The backend expects the `count` field
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  // Increment count
  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCountOnServer(newCount);
  };

  // Decrement count
  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    updateCountOnServer(newCount);
  };

  // Reset count to 0
  const reset = () => {
    setCount(0);
    updateCountOnServer(0);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Web counter
      </header>

      <main className={styles.main}>
        <div>
          <p className="display-1 d-flex align-items-center justify-content-center" style={{fontSize: '12rem'}}>
            COUNT: {count}
          </p>
          <div className="container d-flex align-items-center justify-content-center">
            <button type="button" className="btn btn-dark btn-lg" onClick={decrement} style={{margin: '0.5rem', width: '25rem', height: '5rem', borderRadius: '1rem', fontSize: '1.5rem'}}>
              -1
            </button>
            <button type="button" className="btn btn-dark btn-lg" onClick={increment} style={{margin: '0.5rem', width: '25rem', height: '5rem', borderRadius: '1rem', fontSize: '1.5rem'}}>
              +1
            </button>
          </div>
          <div className="container d-flex align-items-center justify-content-center">
            <button type="button" className="btn btn-dark btn-sm" onClick={reset} style={{width: '51rem', padding: '0.8rem', margin: '0.25rem', borderRadius: '2rem', fontSize: '1.2rem'}}>
              reset
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
