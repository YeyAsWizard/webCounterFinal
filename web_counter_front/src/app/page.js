"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [count, setCount] = useState(0);
  const [multiply, setMulti] = useState(1);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [inputValue, setInputValue] = useState('');

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
  useEffect(() => {
    const switchElement = document.getElementById('flexSwitchCheckDefault');
    switchElement.addEventListener('change', () => {
      setIsSwitchOn(switchElement.checked);
    });
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


  const increment = async () => {
    try {
      if(!isSwitchOn){
        const response = await axios.patch("http://localhost:8000/count/increase");
        setCount(response.data); // Assuming the API returns just the count number
      }else{
          const response = await axios.patch(`http://localhost:8000/count/increase-multiply/${multiply}`);
          setCount(response.data); // Assuming the API returns just the count number
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }
  const decrement = async () => {
    try {
      if(!isSwitchOn){
      const response = await axios.patch("http://localhost:8000/count/decrease");
      setCount(response.data); // Assuming the API returns just the count number
      }else{
        const response = await axios.patch(`http://localhost:8000/count/decrease-multiply/${multiply}`);
        setCount(response.data); // Assuming the API returns just the count number
    }
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }
  const reset = async () => {
    try {
      const response = await axios.patch("http://localhost:8000/count/reset");
      setCount(response.data); // Assuming the API returns just the count number
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }

  const overwrite = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/count/overwrite/${inputValue}`)
      setCount(response.data); // Assuming the API returns just the count number
    } catch (error) {
      console.error("Error fetching count:", error);
    }
  }



  const inmulti = () => {
    if(isSwitchOn){
      const newMulti = multiply+1
      setMulti(newMulti)}
  }
  const demulti = () => {
    if(isSwitchOn){
      const newMulti = multiply-1
      if(newMulti <= 0){
        setMulti(1);
      }else{
      setMulti(newMulti)}
    }
  }
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        Web counter
      </header>

      <main className={styles.main}>
        <div>
          <p className="display-1 d-flex align-items-center justify-content-center" style={{fontSize: '10rem'}}>
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
          <div className="container d-flex align-items-center justify-content-center">
          <div class="container text-center">
              <div class="row">
                <div class="col form-check form-switch" checked={isSwitchOn} onChange={() => setIsSwitchOn(!isSwitchOn)}>
                  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{width: '3.25rem', padding: '0.8rem', margin: '0.25rem', borderRadius: '2rem'}}/>
                  <label class="form-check-label" for="flexSwitchCheckDefault" style={{width: '4rem', borderRadius: '2rem', fontSize: '1.5rem', marginRight:'3rem'}}>Multiplier</label>
                </div>
                <button type="button" className="col btn btn-dark btn-lg" onClick={demulti}  style={{width: '5rem', height: '3rem', fontSize: '1rem'}}>
                  -1
                </button>
                <p className="col display-1 d-flex align-items-center justify-content-center" style={{fontSize: '1.5rem'}}>
                  Multiplier: {multiply}
                </p>
                <button type="button" className="col btn btn-dark btn-lg" onClick={inmulti} style={{width: '5rem', height: '3rem', fontSize: '1rem'}}>
                  +1
                </button>
              </div>
            </div>
          </div>
          <div className="container d-flex align-items-center justify-content-center" style={{marginTop:'1rem'}}>
            <input type="text" value={inputValue} onChange={(event) => setInputValue(event.target.value)} style={{width: '20rem',height: '2.2rem', borderRadius: '0.2rem', margin: '1rem'}}></input>
            <button type="button" className="col btn btn-dark btn-lg" onClick={overwrite} style={{width: '5rem', height: '2.5rem', fontSize: '1rem'}}>
                  submit
                </button>
          </div>
        </div>
      </main>
    </div>
  );
}
