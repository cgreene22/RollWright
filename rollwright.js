/* rollwright.js */

// naturally we start by attaching our HTML elements
const CUSTOM = document.getElementById("custom");
const ROLLOUT = document.getElementById("rollOut");

// We use the iterator so people can tell their rolls apart in the output
let iterator = 1;

function roll(die) {
  return Math.floor(Math.random() * die) + 1;
}

function flip() {
  var toss = Math.floor(Math.random() * 2) + 1;
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
  var rolled = roll(die);
  print("Rolled 1d" + die + ": " + rolled);
}

// THIRD PHASE CUSTOM ROLLS

// takes the user's input
// finds how many dice roll requests there are
// returns the index position of each dice call
function findDiceCalls(input) {
  var i = 0;
  var j = 0;
  var dIndexes = [];
  // find any dice calls in the string
  while (i < input.length) {
    // scan input and find instances of the letter d
    if (input[i] == "d" || input[i] == "D") {
      // when found, save index to array
      dIndexes[j] = i;
      j++;
      i++;
    } else {
      i++;
    }
  }
  // return the array of indexes
  return dIndexes;
}

// takes the user's input & d-indexes
// returns an array of dice roll strings
function parseRolls(input, indexes) {
  var i = 0;
  var start = -1;
  var end = -1;
  var nums = new RegExp("[0-9d]");
  var rolls = [];
  // for each dice call find the beginning of the dice call
  for (var j = 0; j < indexes.length; j++) {
    i = indexes[j];
    while (i >= 0) {
      if (!nums.test(input[i])) {
        start = i + 1;
        i = -1;
      } else if (i == 0) {
        start = 0;
        i = -1;
      } else {
        i--;
      }
    }
    // regex test to find the end of the dice call
    i = indexes[j];
    while (i <= input.length && i != -1) {
      if (!nums.test(input[i])) {
        end = i;
        i = -1;
      } else if (i == input.length) {
        end = i;
        i = -1;
      } else {
        i++;
      }
    }
    // save a substring of the requested roll to an array
    rolls[j] = input.slice(start, end);
  }
  return rolls;
}

// takes the array of dice requests
// performs the dice roll operations
// returns the array of random numbers
function calcRolls(rolls) {
  var calcs = [];
  for (var i = 0; i < rolls.length; i++) {
    var total = "";
    var getRoll = rolls[i].split("d");
    for (var j = 0; j < getRoll[0]; j++) {
      var calc = Math.floor(Math.random() * getRoll[1]) + 1;
      if (j == 0 && getRoll[0] == 1) {
        total += "(" + calc + ")";
      } else if (j == 0) {
          total += "(" + calc;
      } else if (j == getRoll[0] - 1) {
        total += " + " + calc + ")";
      } else {
        total += " + " + calc;
      }
    }
    calcs[i] = total;
  }
  return calcs;
}

function substitute(input, rolls, calcs) {
  for (var i = 0; i < rolls.length; i++) {
    input = input.replace(rolls[i], calcs[i]);
  }
  return input;
}

// So when it all comes together
function rollCustom() {
  try {
    // We get the user's request
    var input = CUSTOM.value;
    // we figure out how many dice rolls we need
    // and get some info so we can read them properly
    var indexes = findDiceCalls(input);
    // we figure out exactly how many rolls to make per type of die
    // and build an array of these roll request strings
    var rolls = parseRolls(input, indexes);
    // we perform the rolls requested
    // and build an array of these roll result strings
    var calcs = calcRolls(rolls);
    // we update our original user's request string
    // by replacing the roll requests with their results
    var equation = substitute(input, rolls, calcs);
    // we then take the final equation string
    // let MathJS evaluate it by standard order of operations
    // and then round it down*
    var final = Math.floor(math.eval(equation));
    // and finally print it out to our standard output
    // with the equation final and result so the user can see our workings
    print(equation + ": " + final);
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