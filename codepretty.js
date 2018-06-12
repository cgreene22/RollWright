const reader = new FileReader();
const out = document.getElementById('output');
const code = new File(['roll'], 'rollwright.js', {
    type: 'text/plain'
});

reader.onload() = function () {
    const lines = reader.result.split('\n').map(function (line) {
        return line;
    });
    console.log(lines);
}

function printCode() {
    try {
        reader.readAsText('rollwright.js');
    } catch (error) {
        console.log(error);
    }
}

// THIS DOESN'T WORK BECAUSE OF JAVASCRIPT