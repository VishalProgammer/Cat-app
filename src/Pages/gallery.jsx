import './gallery.css'

const Gallery = (props) =>{
    return(
        <>
        <img id='refreshBtn' onClick={props.refresh} src="https://cdn-icons-png.flaticon.com/128/181/181558.png" alt="refresh btn" />
        <div id="GalleryBody">
            <h1 id='header-gallery'>Gallery</h1>
            <form action="submit">
            <input value={props.inputValue} id='searchText' type="text" placeholder="breed name" onChange={props.searchText} />
            <button id='imgFindBtn' type='submit' onClick={props.findBtn}>Find</button>
            </form>
            
        </div>
        </>
    )
}

const GalleryAlbum= (props)=>{
    return  <div id='album'>
        {props.images}
    </div>
}

const  GalleryResult= (props)=>{
    return <div id='album'>
        {props.images}
    </div>
}

export  {Gallery,GalleryAlbum, GalleryResult};