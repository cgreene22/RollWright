const CUSTOM = document.getElementById("custom");
const ROLLOUT = document.getElementById("rollOut");

// We use the iterator so people can tell their rolls apart in the output
let iterator = 1;

function roll(die) {
  return Math.floor(Math.random() * die) + 1;
}

/* 
function findMath(request) {
    var test = false;
    // It took a frustrating amount of time to discover this
    // particular idiosyncracy of JS, namely that special Regex
    // characters need to be double escaped to find matches.
    // Fun. So much fun.
    var checkPlus = new RegExp('\\++');
    if (checkPlus.test(request)) {
        test = true;
    }
    var checkMinus = new RegExp('\\-+');
    if (checkMinus.test(request)) {
        test = true;
    }
    var checkMulti = new RegExp('\\*+');
    if (checkMulti.test(request)) {
        test = true;
    }
    var checkDivi = new RegExp('\\/+');
    if (checkDivi.test(request)) {
        test = true;
    }
    return test;
} 
*/

/*
function rollCustom() {
    query = CUSTOM.value;
    // Separate the modifiers
    var modFlag = false;
    var rolls = "";
    var modifiers = "";
    var i = 0;
    try {
        while (!modFlag) {
            if (!findMath(query)) {
                rolls = query;
                modFlag = true;
                console.log("Rolls: " + rolls);
            }
            else if (findMath(query[i])) {
                rolls = query.substring(0, i);
                modifiers = query.substring(i, query.length);
                console.log("Rolls: " + rolls);
                console.log("Mods: " + modifiers);
                modFlag = true;
            }
            else {
                i++;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    var check2 = new RegExp('^[0-9]+d[0-9]+$', 'i');
    if (!check2.test(rolls)) {
        print("Proper formatting is [number] d [number], like 3d6, with any math after (like 3d6+3).");
    }
    else {
        // Get the number and type of dice
        var dice = rolls.split("d");
        var toRoll = dice[0];
        var die = dice[1];
        var count = [];
        var total = 0;
        for (var c = 0; c < toRoll; c++) {
            var rolled = roll(die);
            count[c] = " " + rolled;
            total += rolled;
        }
        var printRolls = count.toString();
        print("Rolled " + toRoll + "d" + die + ":" + printRolls + ".<br />Total: " + total);
    }
}
*/

function print(s) {
  var i = iterator++;
  ROLLOUT.innerHTML =
    "<p class='light'>[" + i + "] " + s + "</p>" + ROLLOUT.innerHTML;
}

function printRoll(die) {
  var rolled = roll(die);
  print("Rolled 1d" + die + ": " + rolled);
}

function flip() {
  var toss = Math.floor(Math.random() * 2) + 1;
  if (toss == 1) toss = "Heads";
  else toss = "Tails";
  print("Coin Tossed: " + toss);
}

/* function getRequest() {
  var request = CUSTOM.value;
  checkRequest(request);
  return request;
}

function checkRequest(input) {
  // REGEX CHECK OR SOMETHING
}

function getIndices(request) {
  var indices = [];
  var j = 0;
  for (var i = 0; i < request.length; i++) {
    if (request.charAt(i) == "d") {
      indices[j] = i;
      j++;
    }
  }
  return indices;
}

function getRolls(request, indices) {
  var count = [];
  var die = [];
  for (var i = 0; i < indices.length; i++) {
    //count[i] = getCount(request, indices[i]);
    die[i] = getDie(request, indices);
  }
  var rolls = [count, die];
  return rolls;
}

function getCount(req, index) {
  var i = index - 1;
  var stop = index;
  while (!isNaN(req.charAt(i)) && i > 0) {
    stop--;
    i--;
  }
  return req.slice(stop - 1, index);
}

function getDie(req, index) {
  var i = index + 1;
  var stop = index;
  while (!isNaN(req.charAt(i)) && i < req.length) {
    stop++;
    i++;
  }
  return req.slice(index + 1, stop);
}

function rollCustom() {
  var req = getRequest();
  // checkRequest(req);
  var indices = getIndices(req);
  var rolls = getRolls(req, indices);
  print(rolls.toString());
} */

// THIRD PHASE

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
      if (j == 0) {
        total += calc;
      } else {
        total += "+" + calc;
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

function rollCustom() {
  var input = CUSTOM.value;
  var indexes = findDiceCalls(input);
  var rolls = parseRolls(input, indexes);
  var calcs = calcRolls(rolls);
  var equation = substitute(input, rolls, calcs);
  var final = Math.floor(math.eval(equation));
  print(equation + ": " + final);
}
