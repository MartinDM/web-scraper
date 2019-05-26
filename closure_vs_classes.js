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