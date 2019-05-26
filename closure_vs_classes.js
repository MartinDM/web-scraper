/* Babel:
  https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYGwhgzhAECCB2BLAtmE0DeAoa1gHt4IAXAJwFdhj9SAKASm112IAtEIA6AfQDN98AE2gBeaAHJ8vXmnE5oAX3nyADqQCmvdRvjB1DJsw3FypeBICS0EIgDW6iQGo2HHvyEBueUqVYA9H7QAKoQiPAA5ngg-BCmDvyk0BBgyA4uEVhYvOS6xIiE0GBIqCAGWACQBETE0O7CYuIARupFEOJeuPLZufnmapra6rr6jPLlxqbm4lY29k4uXHUdisq4E2aY0P1aOnorvlUk0ACyYACeYKKFxWgMXoc1pxcAYqT4yADC4FBX8OoA7nAbqV6PdCBB8CB1JxouFaE8wJxtoNhqCgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=true&targets=&version=7.4.5&externalPlugins= */
  
class Animal {
    constructor(){
      this._food = 'offal'
    }
    
    preference(){
      return 'I like '+this._food;
    }
  }
  
  // Using closure for same thing
  function animal(){
      const food = 'beans';
    
    function preference(){
        return 'I like '+this.food;
    }
    
    return { preference }
  }
  
  const maya = animal();
  const MayaFromClass = new Animal();
  console.log(Maya.preference);
  