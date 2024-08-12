class Rover {
   // Write code here!
   constructor(postion, mode) {
      this.postion = postion;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(theMessage){
      let message = theMessage.name;
      let results = [];
      for(let i = 0; i < theMessage.commands.length; i++) {
         if(theMessage.commands[i].commandType === "MOVE") {
            if(this.mode === "LOW_POWER") {
               results.push({completed: false});
            } else {
               results.push({completed: true});
               this.postion = theMessage.commands[i].value;
            }
         } 
            else if(theMessage.commands[i].commandType === "STATUS_CHECK") {
            results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, postion: this.postion}});
         } 
            else if(theMessage.commands[i].commandType === "MODE_CHANGE") {
            results.push({completed: true});
            this.mode = theMessage.commands[i].value;
         }
      }
      return {message, results};
   }
}

module.exports = Rover;