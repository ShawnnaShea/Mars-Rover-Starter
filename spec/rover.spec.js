const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position to default values for mode and generatorWatts", function() {
    let rover = new Rover('98382');
    expect(rover.postion).toEqual('98382');
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
});

  it("response returned by receiveMessage contains name of message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    // Passes 98382 as the rover's position.
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test message with two commands');
  });

  it("response returned by receiveMessage include two results if two commands are sent in the message", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(commands.length);
  });

  it("responds correctly to the status check command", function(){
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    let status = {mode: (rover.mode), generatorWatts: (rover.generatorWatts), postion: (rover.postion)};
    expect(response.results[0].roverStatus).toEqual(status);
  });

  it("responds correctly to the mode change command", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER', 'NORMAL')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER' || 'NORMAL');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 500)];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover(98382);    
    let response = rover.receiveMessage(message);
    console.log(rover.position);
    expect(response.results[1]).toEqual({completed: false});
  });

  it("responds with the position for the move command", function() {
    let commands = [new Command('MOVE', '500')];
    let message = new Message('Test message with two commands', commands);
    let rover = new Rover('98382');    
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(500);
  });

  
});
