import { useState } from 'react'
import './App.css'
import React from 'react';
import Home from './Pages/homePage';
import { useEffect } from 'react';
import {BreedWiki,BreedList, BreedInfo} from './Pages/breedWiki';
import {Gallery,GalleryAlbum, GalleryResult} from './Pages/gallery';
import axios from 'axios';


function App() {
  const [data, setData] = useState(null);
  const [showHome, setShowHome] = useState(true);
  const [showBreedWiki, setShowBreedWiki] = useState(false);
  const [breedSearchText, setBreedSearchText] = useState('');
  const [breedNames, setBreedNames] = useState('');
  const [breedresultObj, setBreedresultObj] = useState([]);
  const [seletedBreed, setseletedBreed] = useState([])
  const [filteredId, setFilteredId] = useState([]);
  const [breedInfoImg, setBreedInfoImg] = useState([])
  const [catImages, setCatImages] = useState([])
  const [showGallery, setShowGallery] = useState(false);
  const [galleryIds, setgalleryIds] = useState([])
  const [gallerySearchText, setgallerySearchText] = useState('');
  const [galleryImgs, setgalleryImgs] = useState([]);
  const [refresh, setrefresh] = useState([])
  const [showAlbum, setshowAlbum] = useState(false);
  const [album, setalbum] = useState([])
  const [showGalleryResult, setshowGalleryResult] = useState(false)
  const [showBreedList, setshowBreedList] = useState(true);
  const [showBreedResult, setshowBreedResult] = useState(true);
  const [showBreedInfo, setshowBreedInfo] = useState(false);
  const apiKey = import.meta.env.CAT_API_KEY;
  const URL = `https://api.thecatapi.com/v1/breeds?api_key=${apiKey}`


  useEffect(() => {
    axios.
    get(URL).
    then((response)=>{
      setData(response.data)
      setBreedNames(response.data.name)
      setgalleryIds(response.data.reference_image_id)
      console.log('info:-',response.data);
      
    }).
    catch(console.log('Error 404'))
  }, []);


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
  

  const onHomeClick = (event) => {
    setShowBreedWiki(false);
    setShowHome(true);
    setShowGallery(false);
    setshowBreedInfo(false);
    setshowBreedList(false);
    setshowBreedResult(false);
    setshowGalleryResult(false);
    setshowAlbum(false);
  }
  
  const onBreedWikiClick = (event) => {
    axios.get(URL).then(response=>setData(response.data));
    setShowBreedWiki(true);
    setShowHome(false);
    setShowGallery(false);
    setshowBreedInfo(false);
    setshowBreedList(true);
    setshowBreedResult(true);
    setshowGalleryResult(false);
    setshowAlbum(false);
    console.log('all data:', data);
    setBreedNames(data.map(a=>a.name));
  }
  const breedWikiSearchValue = (p) => {
    setBreedSearchText(p.target.value)};
  
  const onBreedWikiSearch =  (event) =>{
    event.preventDefault();
    setBreedNames(data.map(a=>a.name));
    setshowBreedList(false);
    setshowBreedResult(true);
  }

  const breedURL = () =>{
    return breedNames.map((name)=><span id='breedNames'><a href={
      data.find((item) => item.name === name).vetstreet_url || 
      data.find((item) => item.name === name).wikipedia_url}>{name}</a></span>)
  }

  const onClickInfoBtn = (a) =>{
    setshowBreedList(false)
    setshowBreedInfo(true)
    setshowBreedResult(false)
    setBreedSearchText('')
    setBreedresultObj(data.find(breed => breed.id === a))
    setseletedBreed(data.find(breed => breed.id === a).reference_image_id);
    console.log("Selected Breed id:",seletedBreed);
    console.log('IMAGES:', catImages);
  }

  useEffect(() => {
    axios
    .get(`https://api.thecatapi.com/v1/images/${seletedBreed}`)
    .then((response) => {
      setBreedInfoImg(response.data.url); // store the image URL
    })
    .catch(() => console.log('Error fetching image'));
    console.log("Selected Breed img:", breedInfoImg);

  }, [seletedBreed])
  
  
    
  const onGalleryClick = (event) => {
    setShowBreedWiki(false);
    setShowHome(false);
    setShowGallery(true);
    setshowBreedInfo(false);
    setshowBreedList(false);
    setshowBreedResult(false);
    setshowGalleryResult(false);
    setshowAlbum(true);
    
  }
  const gallerySearchValue = (p) => {
    setgallerySearchText(p.target.value)};

  const galleryFindBtn = (event) =>{
    event.preventDefault();
    setshowAlbum(false);
    setshowGalleryResult(true);
    axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${data.find(a => a.name.toLowerCase() == gallerySearchText.toLowerCase()).id}&api_key=${apiKey}`).
    then((response)=>{
      setgalleryImgs(response.data.map(a=>a.url));
      console.log('All IMGS data:' ,response.data.map(a=>a.url));
    })

  }
  useEffect(() => {
    axios.get(`https://api.thecatapi.com/v1/images/search?limit=10`).
    then((response)=>{
      console.log('Random Images:', response.data);
      setalbum(response.data.map(a => a.url));
    })
  
  }, [showAlbum, refresh])
  
  const onRefresh = ()=>{
    setrefresh(a => [...a, 'refresh'])
    setshowGalleryResult(false)
    setshowAlbum(true)
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

        <div id='breedSearchSuggestions'>{showBreedResult && filteredId && data?

        (filteredId.slice(0,5).
        map(id => (<>
          <p id='resultRef' key={id}>
            {data.find(breed => breed.id === id)?.name}
          </p>
          <button 
          onClick={() => onClickInfoBtn(id)}
          id='resultBtn'>
          {data.find(breed => breed.id === id)?.id}
        </button>
        <br /><br /></>))):
        null}</div>
        
      {showBreedWiki && showBreedList?
      (<BreedList 
        data={breedURL()}/>)
        :null}
     
     {showBreedInfo && breedInfoImg && seletedBreed && data?
      (<BreedInfo 
        name={breedresultObj.name} 
        description={breedresultObj.description} 
        origin={breedresultObj.origin} 
        temperament={breedresultObj.temperament} 
        lifeSpan={breedresultObj.life_span}
        adapt={breedresultObj.adaptability || 'null'}
        withDog={breedresultObj.dog_friendly || 'null'}
        withKids={breedresultObj.child_friendly || 'null'}
        indoor={breedresultObj.indoor || 'null'}
        smart={breedresultObj.intelligence || 'null'}
        img={breedInfoImg} 
        cfa={breedresultObj.cfa_url}
        vet={breedresultObj.vetstreet_url}
        wiki={breedresultObj.wikipedia_url}/>):
        null}
      


      {showGallery?
      (<Gallery 
        searchText={gallerySearchValue} 
        value={gallerySearchText} 
        findBtn={galleryFindBtn}
        refresh={onRefresh}
        />):null
      }
      {galleryImgs && showGalleryResult?
      (<GalleryResult images={galleryImgs.map((url, index)=><img id='galleryImg' alt={index} src={url}></img>)}/>):
      null}
      {album && showAlbum || showAlbum=='refresh'?
        (<GalleryAlbum 
          images={album.map((url, index) => <img id='galleryImg' 
            alt={index} src={url}></img>)} />):
        null
      }
    </div>
  )
}

export default App;
