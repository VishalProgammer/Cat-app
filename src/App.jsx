import { useState } from 'react'
import './App.css'
import React from 'react';
import Home from './Pages/homePage';
import { useEffect } from 'react';
import BreedWiki from './Pages/breedWiki';
import Gallery from './Pages/gallery';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const [showBreedWiki, setShowBreedWiki] = useState(false);
  const [showGallery, setShowGallery] = useState(false)
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

  

  const onHomeClick = (event) => {
    setShowBreedWiki(false)
    setShowHome(true)
    setShowGallery(false)
  }
  
  const onBreedWikiClick = (event) => {
    fetch(`https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`).then(response=>setData(response.data))
    setShowBreedWiki(true)
    setShowHome(false)
    setShowGallery(false)
    console.log(data);
    
  }
  
  const onGalleryClick = (event) => {
    setShowBreedWiki(false)
    setShowHome(false)
    setShowGallery(true)
  }
  

  return (
    <>
    <nav><ul id='titleBar'>
      <li onClick={onHomeClick}>Home</li>
      <li onClick={onBreedWikiClick}>BreedWiki</li>
      <li onClick={onGalleryClick}>Gallery</li>
      </ul></nav>
      {showHome?
      (<Home/>):(null)
      }

      {showBreedWiki?
      (<BreedWiki/>):(null)
      }

      {showGallery?
      (<Gallery/>):null
      }
    </>
  )
}

export default App;
