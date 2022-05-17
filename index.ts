import { Employee } from "./models";
import { example1, example2, example3, example4 } from "./examples.json";

import * as Moment from "moment";
import { extendMoment } from "moment-range";

import * as _ from "lodash";

const moment = extendMoment(Moment);

const testCases: TestCase[] = [
  {
    testNumber: 1,
    employees: example1 as Employee[],
    expectedResult: [
      ["ASTRID", "ANDRES", 3],
      ["ASTRID", "RENE", 2],
      ["ANDRES", "RENE", 2],
    ],
  },
  {
    testNumber: 2,
    employees: example2 as Employee[],
    expectedResult: [["RENE", "ASTRID", 3]],
  },
  {
    testNumber: 3,
    employees: example3 as Employee[],
    expectedResult: [["ANDRES", "ASTRID", 3]],
  },
  {
    testNumber: 4,
    employees: example4 as Employee[],
    expectedResult: [
      ["ANDRES", "RENE", 6],
      ["ANDRES", "KEVIN", 6],
      ["KEVIN", "RENE", 6],
    ],
  },
];

/**
 * Compares two employees to find coincidences
 * @param pair
 * @returns Comparison results
 */
const comparePair = (pair: Employee[]): Array<string | number> | null => {
  const result: Array<string | number> = [pair[0].name, pair[1].name];
  let coincidences = 0;

  pair[0].intervals.forEach((firstInterval) => {
    pair[1].intervals.forEach((secondInterval) => {
      const firstRange = moment.range(
        moment(firstInterval.start),
        moment(firstInterval.end)
      );
      const secondRange = moment.range(
        moment(secondInterval.start),
        moment(secondInterval.end)
      );
      if (firstRange.intersect(secondRange)) {
        coincidences++;
      }
    });
  });

  if (coincidences <= 0) return null;

  result.push(coincidences);

  return result;
};
/**
 *
 * @param employees
 * @returns Exercise results
 */
function solve(employees: Employee[]): Array<Array<string | number>> {
  // generate pairs of employees
  const pairs = employees.flatMap((v, i) =>
    employees.slice(i + 1).map((w) => [v, w])
  );

  // compare each pair and populate the results
  const results: Array<Array<string | number>> = [];

  pairs.forEach((pair) => {
    const result = comparePair(pair);
    if (result) {
      results.push(result);
    }
  });

  return results;
}

// Testing the code
function main(): void {
  const failed: number[] = [];
  console.log("\n\n========== Start ==========");
  testCases.forEach((testCase) => {
    try {
      const results = solve(testCase.employees);

      //display expected results
      console.log("expected results:");
      console.table(testCase.expectedResult);

      //display obtained results
      console.log("obtained results:");
      console.table(results);
      const passed = TestCase.validate(testCase.expectedResult, results);

      console.log(
        `Test #${testCase.testNumber} ${passed ? "passed" : "failed:"}`
      );

      if (!passed) {
        throw Error("Wrong results");
      }
    } catch (e) {
      console.log(
        `TestCase ${testCase.testNumber}: caused an exception (${
          (e as Error).message
        }) => test case failed`
      );

      failed.push(testCase.testNumber);
    }
  });
  console.log(
    `\n\nResult: test suite ${
      0 === failed.length
        ? "passed"
        : `failed. failed test(s): ${failed.toString()}`
    }`
  );
}
class TestCase {
  testNumber: number;
  employees: Employee[];
  expectedResult: Array<Array<string | number>>;

  /**
   * Checks length of coincidences found, validates deeper values.
   * @param expectedResults
   * @param results
   * @returns
   */
  static validate = (
    expectedResults: Array<Array<string | number>>,
    results: Array<Array<string | number>>
  ): boolean => {
    let validated = true;

    expectedResults.forEach((expectedResult) => {
      const check = results.some((result) => {
        return (
          result.includes(expectedResult[0]) &&
          result.includes(expectedResult[1]) &&
          result.includes(expectedResult[2])
        );
      });

      if (!check) {
        validated = false;
      }
    });

    return validated && results.length === expectedResults.length;
  };

  constructor(
    testNumber: number,
    employees: Employee[],
    expectedResult: Array<Array<string | number>>
  ) {
    this.testNumber = testNumber;
    this.employees = employees;
    this.expectedResult = expectedResult;
  }
}

main();
