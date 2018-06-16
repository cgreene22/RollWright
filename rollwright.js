/* rollwright.js */

// naturally we start by attaching our HTML elements
const CUSTOM = document.getElementById("custom");
const ROLLOUT = document.getElementById("rollOut");

// We use the iterator so people can tell their rolls apart in the output
let iterator = 1;

var rollDie = function(faces) {
  return Math.floor(Math.random() * faces) + 1;
}

function flip() {
  var toss = rollDie(2);
  if (toss == 1) toss = "Heads";
  else toss = "Tails";
  print("Coin Tossed: " + toss);
}

function print(s) {
  var i = iterator++;
  ROLLOUT.innerHTML =
    "<p class='light'>[" + i + "] " + s + "</p>" + ROLLOUT.innerHTML;
}

function printRoll(die) {
  var rolled = rollDie(die);
  print("Rolled 1d" + die + ": " + rolled);
}

/* PHASE 4 REFACTOR */

var findDice = function(input) {
  return input.match(/\d+[dD]\d+/g);
}

var parseRolls = function(roll) {
  
  var call = roll.split(/[dD]/);
  var results = [];
  for (var i = 0, total = call[0]; i < total; i++) {
      results[i] = rollDie(call[1]);
  }
  return "(" + results.join(" + ") + ")";
}

var rollDice = function(rollsToMake) {
  return rollsToMake.map((roll) => parseRolls(roll));
}

var subRolls = function(input, rollsToMake, rollResults) {
  for (var i = 0, total = rollsToMake.length; i < total; i++) {
      input = input.replace(rollsToMake[i], rollResults[i]);
  }
  return input;
}

var printCustom = function(input, subbed) {
  print("Rolled: " + input + '<br />Results: ' + subbed + "<br />Total: " + Math.floor(math.eval(subbed)));
}

function rollCustom() {
  try {
    var request = CUSTOM.value;
    var rollsToMake = findDice(request);
    var rollResults = rollDice(rollsToMake);
    var subbed = subRolls(request, rollsToMake, rollResults);
    printCustom(request, subbed);
  } catch (error) {
      // I wanna put in better error handling eventually
      // but for now try/catch is enough error handling
    print(
      "Oops, something went wrong. Check your formatting and try again." +
        "<br /><br />Remember, you can make pretty much any basic math expression, " +
        "but anything beyond addition, subtraction, multiplication, or " + 
        "division isn't going to work."
    );
  }
}

// NEXT STEPS: Fixing display sizing issues, responsiveness, and maybe some jQuery(?)