var debug = function(output) {
    if (typeof output == "string") {
        console.log(output);
    } else {
        console.dir(output);
    }
};

var getTime = function() {
    var hrTime = process.hrtime();
    return hrTime[0] * 1000 + hrTime[1] / 1000000;
};

var node = true;
var replacer = function(key, val) {
    return val && val.toFixed ? Number(val.toFixed(5)) : val;
};
var equ = "========================================"
function runTests(name, tests) {
    debug("\nStarting " + name + " tests\n" + equ);
    for (var i = 0; i < tests.length; i++) {
        var t = tests[i];
        var failed = 0;
        var actual = t.fn();
        var expected = t.expected;
        var actualString = JSON.stringify(actual, replacer);
        var expectedString = JSON.stringify(expected, replacer);
        if (actualString != expectedString) {
            failed++;
            console.warn("FAILED:   " + t.name + " failed. Expected:\n\t" + expectedString + "\nReceived:\n\t" + actualString);
        } else {
            console.log("passed:   " + t.name + " passed");
        }
    }
    if (failed) {
        throw "### Error. " + failed + " tests failed";
    } else {
        console.log(equ + "\nAll " + name + " tests passed\n" + equ + "\n");
    }
}


runTests("basic", require("./basicTests"));
runTests("algorithm", require("./algorithmTests"));