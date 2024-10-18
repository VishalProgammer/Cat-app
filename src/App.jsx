import { useState } from 'react'
import './App.css'
import React from 'react';
import Home from './Pages/homePage';
import { useEffect } from 'react';



function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const [showBreedWiki, setShowBreedWiki] = useState(false);
  const apiKey = import.meta.env.CAT_API_KEY;
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  return (
    <>
      {showHome?
      (<Home/>):(null)
      }
      {showBreedWiki

      }
    </>
  )
}

export default App;
