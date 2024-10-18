import './breedWiki.css'

const BreedWiki = (props)=>{
    return(
        <div id="body">
            <h1 id="heading">BreedWiki</h1>
            <form action="submit">
            <input id="searchBar" onChange={props.searchText} type="text" />
            <button onClick={props.onClick} type="submit">Search</button>
            <div>{props.breeds}</div>
        </form></div>
    )
}

export default BreedWiki;