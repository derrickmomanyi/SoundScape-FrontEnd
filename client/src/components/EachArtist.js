import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AlbumPage from "./AlbumPage";
import ArtistBanner from "./ArtistBanner";
import '../css/EachArtist.css'


const EachArtist = ( { user }) => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [artist, setArtist] = useState([])
  const { id } = useParams();

  useEffect(() => {
    fetch(`/artists/${id}`)
    .then((r) => r.json())
    .then(artist => {
      setArtist(artist);
      setIsLoaded(true)
    })
  }, [id])

if (!isLoaded) return <h2>Loading...</h2>


  return (
    <div className="artist_body">
      <ArtistBanner artist={artist}/>
      <div className="albums_container">
        {artist.albums.map(album =>
            <AlbumPage key = {album.id} album={album} user={user}/>
          )}
      </div>
    </div>
  );
};

export default EachArtist;