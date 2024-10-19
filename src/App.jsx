import { useState } from 'react'
import './App.css'
import React from 'react';
import Home from './Pages/homePage';
import { useEffect } from 'react';
import {BreedWiki,BreedList, BreedWikiResult} from './Pages/breedWiki';
import Gallery from './Pages/gallery';
import axios from 'axios';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const [showBreedWiki, setShowBreedWiki] = useState(false);
  const [breedSearchText, setBreedSearchText] = useState('');
  const [breedNames, setBreedNames] = useState('');
  const [breedresultObj, setBreedresultObj] = useState([]);
  const [breedSearchError, setbreedSearchError] = useState('')
  const [filteredId, setFilteredId] = useState([]);
  const [gallerySearchText, setgallerySearchText] = useState('');
  const [showGallery, setShowGallery] = useState(false);
  const [showBreedList, setshowBreedList] = useState(true);
  const [showBreedResult, setshowBreedResult] = useState(false);
  const apiKey = import.meta.env.CAT_API_KEY;
  const URL = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`

  useEffect(() => {
    if (breedSearchText && data.length > 0) {
      const filtered = data.filter(breed => 
        breed.name.toLowerCase().includes(breedSearchText.toLowerCase()))
        .map(breed => breed.id);

      setFilteredId(filtered);
    }
    
    else {
      setFilteredId([]);

    
    
    }
    
  }, [breedSearchText, data])


  useEffect(() => {
    axios.
    get(URL).
    then((response)=>{
      setData(response.data)
      setBreedNames(response.data.name)
    }).
    catch(console.log('Error 404'))
    
    
   
  }, []);

  

  const onHomeClick = (event) => {
    setShowBreedWiki(false)
    setShowHome(true)
    setShowGallery(false)
  }
  
  const onBreedWikiClick = (event) => {
    axios.get(URL).then(response=>setData(response.data))
    setShowBreedWiki(true)
    setShowHome(false)
    setShowGallery(false)
    console.log('all data:', data);
    setBreedNames(data.map(a=>a.name));
    console.log(breedNames);
    

  }
  const breedWikiSearchValue = (p) => {
    setBreedSearchText(p.target.value)};
  
  const onBreedWikiSearch =  (event) =>{
    event.preventDefault();
    setBreedNames(data.map(a=>a.name));
    setshowBreedList(false);
    setshowBreedResult(true);

    setBreedresultObj(data.find(a =>  a.name == breedSearchText))
    breedresultObj? setBreedresultObj(breedresultObj):setbreedSearchError("Wrong Breed Name ;<")
  }
  
  
  
  const onGalleryClick = (event) => {
    setShowBreedWiki(false)
    setShowHome(false)
    setShowGallery(true)
  }
  
  

  const breedURL = () =>{
    return breedNames.map((name)=><span id='breedNames'><a href={
      data.find((item) => item.name === name).vetstreet_url || 
      data.find((item) => item.name === name).wikipedia_url}>{name}</a></span>)
  }

 



  return (
    <div id='body'>
    <nav id='titleBar'>
      <p id='tab' onClick={onHomeClick}>Home</p>
      <p id='tab' onClick={onBreedWikiClick}>BreedWiki</p>
      <p id='tab' onClick={onGalleryClick}>Gallery</p>
    </nav>


      {showHome?
      (<Home/>):(null)
      }


     
      {showBreedWiki?
      (<BreedWiki 
        searchText={breedWikiSearchValue} 
        onClick={onBreedWikiSearch}
        inputValue={breedSearchText}/>)
        :null}

        {filteredId && data?

        (filteredId.slice(0,5).
        map(id => (<>
          <p id='resultRef' key={id}>
            {data.find(breed => breed.id === id)?.name}
          </p>
          <button 
          onClick={() => onClickInfoBtn(id)}
          id='resultBtn'>
          {data.find(country => country.id === id)?.id}
        </button>
        <br /><br /></>))):
        null}
        
      {showBreedWiki && showBreedList?
      (<BreedList 
        data={breedURL()}/>)
        :null}
{        console.log("Checking search:-",  filteredId)}        
     
      


      {showGallery?
      (<Gallery/>):null
      }
    </div>
  )
}

export default App;
