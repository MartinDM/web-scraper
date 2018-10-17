const puppeteer = require('puppeteer');

( async () => {  

    const url = `https://en.wikipedia.org/wiki/Metallica_discography`;
    
  /*   const getArtwork = async (singles) => { 
        singles.forEach( async ( single ) => { 
            await page.evaluate( () => {
                fetch(`http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=440727626b4c31180a790ce8a03247d8&artist=metallica&track=${single}&format=json`)
                .then( response => response.json() )
                .then( json => { 
                    console.log(JSON.stringify(json))
                })
                .catch( (err) => {
                    console.log(err)
                })
            })
        })
    }
     */
    const getSingles = async (url) => {
        const page = await browser.newPage();
        await page.goto(url);
        
        const singles = page.evaluate( () => {
                Array.from(document.getElementById('Singles').parentElement.nextElementSibling.querySelectorAll('tr > th[scope="row"] > a') )
                .map( (single) =>  single.innerText )
        })
        await page.close(); 
    }  

    const browser = await puppeteer.launch(); 
    const singles = await getSingles(url);
   // const artwork = await getArtwork(singles);
    

    //console.log(artwork);

    await browser.close();

})();

/* 
Last FM:
Application name	Music Singles fetcher
API key	440727626b4c31180a790ce8a03247d8
Shared secret	8948fa06a51e9a0fe24f7ddea4955349
Registered to	martin_dm
*/