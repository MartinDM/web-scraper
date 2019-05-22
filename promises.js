// Practicing promises
  
/* start spinner
fetch json
add title
fetch each chapter
add story
stop spinner
*/ 

function get(url) {
    return new Promise( (resolve, reject) => {
        var req = new XMLHttpRequest(); 
        req.open('GET', url);
        req.onload = function(){
            if ( req.status == 200){
                // resolve promise with response text
                resolve(req.response)
            } else {
                reject( Error( req.statusText))
            }
        };
        req.onerror = function(){
            reject( Error('Network error'))
        }; 
        req.send();
    })
}

/*
get('data.json').then( (res) => {
    console.log('sucess', res)
}, (err) => {
    console.log('error:', err)
});
*/

// Transforming values
var promise = new Promise( (res, rej) => {
    res(4);
});

promise.then( (val) => {
    return val*2;
})
// Pass in returned value
.then( (val) => {
    console.log(val);
})

getJson('data.json')
    .then( (res) => {
        console.log('JSON is', res);
    })


//Shortcut for Transforming JSON
// getJSON() returns a promise;
// fetches a url then parses the response as JSON.
function getJson(url){
    return get(url).then( JSON.parse )
    .catch(err => {
        console.log(`Get Json failed with error: ${err}`)
        throw err
    })
}

//Queuing asynchronous actions

// Returning something promise-like
// If a then callback returns another promise, the next then() waits on it being resolved

getJson('data.json')
.then( json => {
    // Returns another url
    return getJson(json[0].url)
})
// Waits until it's resolved...
.then( (item) => {
    console.log(`Got the item: ${item[1].extra_info}`);
});

let articlePromise;

function getArticleInfo(i){
    articlePromise = articlePromise || getJson('data.json') 
    return articlePromise.then( (data) => {
        return getJson( data[i].url )
    })
}

// Function returns the same promise so it's reused, without calling it again
getArticleInfo(0).then( (info) => {
    console.log(info);
    return getArticleInfo(1);
})
.then( (res) => {
    console.log('res', res)
})

// Errors
// Two args, success and failure.
// (Fulfill and reject)

// Two ways of specifying error callbacks
get('data.json3').then( res => {
    console.log(res)
})
.catch( (err)=> {
    console.log('oops', err)
})

get('data.json4').then( (res) => {
    console.log(res)
}, (err) => {
    console.log('oops again', err)
})

getJson('data.json').then( res => {  
    return getJson(res[1].url)
}).then( res => { 
    document.write( res[0].extra_info)
}).catch( () => {
    let div = document.createElement('div')
    div.innerHTML = 'failed'
    div.style.color = 'red';
    document.querySelector('body').appendChild(div);
}).then( () => {
   document.body.style.backgroundColor = 'lightgrey';
})

// Sequencing
const sequence = Promise.resolve();

story.chapterUrls.forEach( (chapterUrl, i) => {
    console.log(i)
    // build up sequence
    sequence = sequence.then( () => {
        return getJson(chapterUrl);
    })
    .then( res => {
        console.log(res)
        document.write('article Text')
    })
});