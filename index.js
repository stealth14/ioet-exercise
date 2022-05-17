"use strict";
exports.__esModule = true;
var examples_1 = require("./examples");
var Moment = require("moment");
var moment_range_1 = require("moment-range");
var moment = (0, moment_range_1.extendMoment)(Moment);
var testCases = [
    {
        testNumber: 1,
        employees: examples_1.EXAMPLE_1_EMPLOYEES,
        expectedResult: [
            ["ASTRID", "ANDRES", 3],
            ["ASTRID", "RENE", 2],
            ["ANDRES", "RENE", 2],
        ]
    },
    {
        testNumber: 2,
        employees: examples_1.EXAMPLE_2_EMPLOYEES,
        expectedResult: [["RENE", "ASTRID", 3]]
    },
];
/**
 * Compares two employees to find coincidences
 * @param pair
 * @returns Comparison results
 */
var comparePair = function (pair) {
    var result = [pair[0].name, pair[1].name];
    var coincidences = 0;
    pair[0].intervals.forEach(function (firstInterval) {
        pair[1].intervals.forEach(function (secondInterval) {
            var firstRange = moment.range(moment(firstInterval.start), moment(firstInterval.end));
            var secondRange = moment.range(moment(secondInterval.start), moment(secondInterval.end));
            if (firstRange.intersect(secondRange)) {
                coincidences++;
            }
        });
    });
    if (coincidences <= 0)
        return null;
    result.push(coincidences);
    return result;
};
/**
 *
 * @param employees
 * @returns Exercise results
 */
function solve(employees) {
    // generate pairs of employees
    var pairs = employees.flatMap(function (v, i) {
        return employees.slice(i + 1).map(function (w) { return [v, w]; });
    });
    // compare each pair and populate the results
    var results = [];
    pairs.forEach(function (pair) {
        var result = comparePair(pair);
        if (result) {
            results.push(result);
        }
    });
    return results;
}
// Testing the code
function main() {
    var failed = [];
    console.log("\n\n========== Start ==========");
    testCases.forEach(function (testCase) {
        try {
            var results = solve(testCase.employees);
            //display expected results
            console.log("expected results:");
            console.table(testCase.expectedResult);
            //display obtained results
            console.log("obtained results:");
            console.table(results);
            var passed = TestCase.validate(testCase.expectedResult, results);
            console.log("Test #".concat(testCase.testNumber, " ").concat(passed ? "passed" : "failed:"));
            if (!passed) {
                throw Error("Wrong results");
            }
        }
        catch (e) {
            console.log("TestCase ".concat(testCase.testNumber, ": caused an exception (").concat(e.message, ") => test case failed"));
            failed.push(testCase.testNumber);
        }
    });
    console.log("\n\nResult: test suite ".concat(0 === failed.length
        ? "passed"
        : "failed. failed test(s): ".concat(failed.toString())));
}
var TestCase = /** @class */ (function () {
    function TestCase(testNumber, employees, expectedResult) {
        this.testNumber = testNumber;
        this.employees = employees;
        this.expectedResult = expectedResult;
    }
    /**
     * Checks length of coincidences found, validates deeper values.
     * @param expectedResults
     * @param results
     * @returns
     */
    TestCase.validate = function (expectedResults, results) {
        var validated = true;
        expectedResults.forEach(function (expectedResult) {
            var check = results.some(function (result) {
                return (result.includes(expectedResult[0]) &&
                    result.includes(expectedResult[1]) &&
                    result.includes(expectedResult[2]));
            });
            if (!check) {
                validated = false;
            }
        });
        return validated && results.length === expectedResults.length;
    };
    return TestCase;
}());
main();
