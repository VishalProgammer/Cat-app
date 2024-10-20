import './breedWiki.css'

const BreedList = (props)=>{
    const condition = props.condition;
    return (
       <>
       <hr />
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
        <div id="BreedBody">
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
const BreedInfo = (props) =>  {
    return(
        <div id='info-card'>
        <h2 id='info-header'>{props.name}</h2>
        <p>{props.description}</p>
        <img id='info-img' src={props.img} alt="Cat Picture,  Cute Cute :3" />
        <br />
        <p id='about'><b>Origin:</b> {props.origin}</p>
        <p id='about'><b>Temperament:</b> {props.temperament}</p>
        <p id='about'><b>Life span: </b>{props.lifeSpan}</p>

        <h3 id='info-header'>Ratings</h3>
        <p id='about'><b>Adaptability: </b>{props.adapt}</p>
        <p id='about'><b>Dog Friendly: </b>{props.withDog}</p>
        <p id='about'><b>Child Friendly: </b>{props.withKids}</p>
        <p id='about'><b>Indoor: </b>{props.indoor}</p>
        <p id='about'><b>Intelligence: </b>{props.smart}</p>
        <br />
        <footer>
        <h4>More Info: </h4>
        <div id='link'>
        <p><a href={props.cfa}>CFA.org</a></p>
        <p><a href={props.vet}>Vet Street</a></p>
        <p><a href={props.wiki}>WikiPedia</a></p>
        </div>
        </footer>
        </div>
    )
}

export {BreedWiki, BreedList, BreedInfo};