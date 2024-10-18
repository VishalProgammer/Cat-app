import './gallery.css'

const Gallery = (props) =>{
    return(
        <div id="body">
            <h1>Gallery</h1>
            <input id='searchText' type="text" placeholder="Which cat's photos you want?" onChange={props.searchText} />
            <button>Find</button>
        </div>
    )
}

export default Gallery;