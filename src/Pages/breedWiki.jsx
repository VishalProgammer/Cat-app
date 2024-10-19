import './breedWiki.css'
const BreedList = (props)=>{
    const condition = props.condition;
    return (
       <>
        <br />
        <h3>List of all Breeds:</h3> 
        <br />
    <div id='list'>
        
        {props.data}
    </div></> 
        
    )
}

const BreedWiki = (props)=>{
    return(
        <div id="body">
            <h1 id="heading">BreedWiki</h1>

            <form action="submit">

            <input type="text"
            value={props.inputValue} 
            placeholder='Breed Name' 
            id="searchBar" 
            onChange={props.searchText}/>

            <button id='btn' onClick={props.onClick} type="submit">Search</button>

            <div>{props.breeds}</div>
        </form>
        </div>
    )
}
const BreedWikiResult = (props) =>  {
    return(
        <div>
        <h2>{props.name}</h2>
        <p>{props.description}</p>
        <br />
        <p>Origin: {props.origin}</p>
        <p>Temperament: {props.temperament}</p>
        <img src={props.img} alt="Cat Picture,  Cute Cute :3" />

        </div>
    )
}

export {BreedWiki, BreedList, BreedWikiResult};