const puppeteer = require('puppeteer');
const fetch = require("node-fetch");

(async () => { 

    const browser = await puppeteer.launch();
    const artist = 'Metallica';
    const url = `https://en.wikipedia.org/wiki/Metallica_discography`;

    const init = async () => { 
        // Fetch tracks first
        const singles = await getSinglesFromArtistWikiPage(url);
        console.log(artist)
        const covers = await getArtworkForSingles(artist, singles);
        console.log('covers are', covers)
    }
 
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

    const getArtworkForSingles = async (artist, singles) => {
        const artwork = [];
        console.log(singles)
        singles.forEach( (single) => { 
            fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=440727626b4c31180a790ce8a03247d8&artist=${artist}&track=${single}&format=json`)
            .then( res => res.json() ) 
            .then( (data) => {
                const tmp = data.track.album.image.map( img => img['#text'] )  
                return tmp
            })
            .then( (albumImageData) => {
                artwork.push(albumImageData[0])
            })
            .then( () => {
                return artwork
            })
            .catch(error =>  null)
        })
        return artwork;
    }
     
    init(); 
  
})()