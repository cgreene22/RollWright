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

function rollCustom() {
    query = CUSTOM.value;
    // Separate the modifiers
    var modFlag = false;
    var terms = [];
    while (!modFlag) {
        /*
        var i = 0;
        var check = /[0-9]?d?/i;
        if (check.test(query.charAt(i))) {
            i++;
        }
        else {
            request = query.slice(0, i-1);
            console.log(request);
            terms[1] = query.substring(i, query.length);
            console.log(terms[1]);
            modFlag = true;
        }
        */
    }
    // Get the number and type of dice
    var dice = query.split("d");
    var rolls = dice[0];
    var die = dice[1];
    var count= [];
    var total = 0;
    for (var c = 0; c < rolls; c++) {
        var rolled = roll(die);
        count[c] = " " + rolled;
        total += rolled;
    }
    var printRolls = count.toString();
    print("Rolled " + rolls + "d" + die + ":" + printRolls + ". Total: " + total);
}

function print(s, i) {
    i = iterator++;
    ROLLOUT.innerHTML = "<p class='light'>[" + i + "] " + s + "</p>" + ROLLOUT.innerHTML;
}

function printRoll(die) {
    var rolled = roll(die);
    print("Rolled 1d" + die + ": " + rolled);
}