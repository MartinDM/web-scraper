const puppeteer = require('puppeteer');

( async () => { 
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `https://en.wikipedia.org/wiki/Metallica_discography`;
    
    const getSingleNames = async (url) => {
        
        await page.goto(url);
        await page.waitForSelector('#Singles');

        const singleNames = await page.evaluate( () => 
        Array.from(document.getElementById('Singles').parentElement.nextElementSibling.querySelectorAll('tr > th[scope="row"] > a') )
        .map( (single, i) => {
            console.log(i)
            return {
                single: single.innerText,
                id: i
            }))
        );
        await page.close();
        return singleNames;
    }
    
    const singleNames = await getSingleNames(url); 
    console.log(singleNames);
    await browser.close();

})();