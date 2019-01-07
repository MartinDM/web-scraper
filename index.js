const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

(async () => { 
    const browser = await puppeteer.launch();
    const url = `https://en.wikipedia.org/wiki/Metallica_discography`;
    
    const getSinglesFromArtistWikiPage = async (url) => {
       const page = await browser.newPage();
       await page.goto(url);
       
       const singles = await page.evaluate(() =>  
       Array.from(document.getElementById('Singles').parentElement.nextElementSibling.querySelectorAll('tr > th[scope="row"] > a'))
       .map( (single, i) =>  single.innerText )
       );
       await page.close();
       return singles;
    }

    const handleErrors = async (response) => {
        if (!response.ok) throw Error(response.statusText);
        return response;
    }
     
    const getArtworkForTrack = async (artist, track) => {
            return fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=440727626b4c31180a790ce8a03247d8&artist=${artist}&track=${track}&format=json`)
                    .then( response => response.json() )
                    .then(json =>  json.track.album.image[3]["#text"] )
                    .catch(error =>  null  ) 
    }

    // Create object of Tracks and cover
    const heavyMetalObject = async ( artist, tracks ) => {
        const obj = {};
        return tracks.map( (track) => {
            const cover = getArtworkForTrack(artist, track); 
            console.log(cover)
            return (
                cover
                //{ ...tracks, cover }
            )
        })
    }

    const tracks = await getSinglesFromArtistWikiPage(url);
    console.log(heavyMetalObject('Metallica', tracks));
    

})()