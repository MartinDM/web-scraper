const fetch = require('node-fetch');
import { handleErrors} from 'handleErrors';

async function getArtworkForTrack(artist, track) => {
    fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=440727626b4c31180a790ce8a038&artist=${artist}&track=${track}&format=json`)
    .then(handleErrors)
    .then(response => response.json() ) 
    .then(json => json.track.album.image[3]["#text"] )
    .catch(error =>  null )
}

export default getArtworkForTrack;