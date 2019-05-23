
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

import { getSinglesFromArtistWikiPage } from './lib/getSingles';
import { heavyMetalObject } from './lib/heavyMetalObject';

(async () => {
    const url = `https://en.wikipedia.org/wiki/Metallica_discography`;
    const tracks = await getSinglesFromArtistWikiPage(url);
    heavyMetalObject('Metallica', tracks);
})();

// Todo:
/*
Use Axios
use getHTML function imported into file > pass it a url

*/