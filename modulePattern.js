// Safe IIFE
// Out of global glope
// Ensures any code preceding this is terminated first with the semi-colon
;(function(){
    console.log('Safe IIFE 🔥 ')

    // Imports
    const fetch = require("node-fetch");

    const App = (function(){

        // Private Vars
        const config = {
            name: 'Martin'
        }

        // https://www.tjvantoll.com/2015/09/13/fetch-and-errors/
        var handleErrors = response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        } 

        return {
            fetchPage: url => {
                if(!url) return;
                let stories = [];
                fetch(url)
                .then(handleErrors)
                .then( res => res.json() )
                .then( res => {
                    const storyData = res.data.children;
                    const stories = storyData.map( story => {
                        const title = story.data.title
                        const url = story.data.url;
                        return { title, url }
                     }) 
                    console.log( '🔖',  stories ); 
                })
                .catch(function(error) {
                    console.log('❌ Error:', error);
                });
            },
            sayName: name => {
                console.log(name)
            }
        }; 
    }())
    
    console.log(App.sayName('Martin'))
    console.log(App.fetchPage('https://www.reddit.com/r/javascript.json'))
})();