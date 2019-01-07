

// Is quite toghtly-coupled to DOm structure for this artist
const puppeteer = require('puppeteer');
const browser = puppeteer.launch();

async function getSinglesFromArtistWikiPage(url) {
    const page = await browser.newPage();
    await page.goto(url);
    
    const singles = await page.evaluate(() =>  
     Array.from(document.getElementById('Singles').parentElement.nextElementSibling.querySelectorAll('tr > th[scope="row"] > a'))
     .map( (single, i) =>  single.innerText )
     );
    await page.close();
    return singles;
 }

 export default getSinglesFromArtistWikiPage;