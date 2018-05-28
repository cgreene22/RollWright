const ROLLOUT = document.getElementById('rollOut');
const CUSTOM = document.getElementById('custom');

// We use the iterator so people can tell their rolls apart in the output
let iterator = 1;

function roll(die) {
    return Math.floor(Math.random() * die) + 1;
}

function flip() {
    var toss = Math.floor(Math.random() * 2) + 1;
    if (toss == 1)
        toss = "Heads";
    else
        toss = "Tails";
    print("Coin Tossed: " + toss);
}

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
        print("Rolled " + rolls + "d" + die + ":" + printRolls + ". Total: " + total);
    }
}

function print(s, i) {
    i = iterator++;
    ROLLOUT.innerHTML = "<p class='light'>[" + i + "] " + s + "</p>" + ROLLOUT.innerHTML;
}

function printRoll(die) {
    var rolled = roll(die);
    print("Rolled 1d" + die + ": " + rolled);
}