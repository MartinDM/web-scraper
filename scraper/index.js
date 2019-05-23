const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

(async () => { 

    const browser = await puppeteer.launch();
    const artist = 'Metallica';
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

    const tracks = await getSinglesFromArtistWikiPage(url);
    const getArtworkForTracks = async (artist, tracks) => {
        let artwork;
        tracks.forEach( (track) => { 
            fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=440727626b4c31180a790ce8a03247d8&artist=${artist}&track=${track}&format=json`)
                .then( res => res.json() )
                .then( data => data.track.album.image[3]["#text"])
                .then( (cover) => {
                    console.log(cover.split('300/')[1])
                    artwork.push(res)
                })
                .catch(error =>  null)
        })
        return covers;
    }

    const covers = await getArtworkForTracks('Metallica', tracks);
    console.log('covers:', covers);
  
})()