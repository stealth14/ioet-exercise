# ioet-exercise

## INSTALLATION

1) Clone the repo
2) Open the project with your preferred editor
3) Open a terminal window on the project directory (Please, use git bash if you are a Windows user)
4) Run `npm install` command  

## EXECUTION

4) Run `npm run start` command
5) The algorythm will solve the examples defined in the [examples.json](./examples.json) file.
6) Results will be tested and displayed in console.

## OVERVIEW

This is a node project with minimal typescript configurations.
Aside from plain typescript, it was neccesary to use `moment` and `moment-range` libraries because of javascript lack of features to handle date operations reliably.

### ARCHITECTURE / METHODOLOGY

The entire solution is heavily influenced by TDD techniques. 

- A Test Case class encapsules the definition of the desired behaviour.
  ```
  {
    testNumber: 1,
    employees: example1 as Employee[],
    expectedResult: [
      ["ASTRID", "ANDRES", 3],
      ["ASTRID", "RENE", 2],
      ["ANDRES", "RENE", 2],
    ],
  }
  ```
- A test function checks the criteria completion of the output
```
    static validate = (
    expectedResults: Array<Array<string | number>>,
    results: Array<Array<string | number>>
  ): boolean => { ...
```

### APROACH
The script basically groups employees in pairs and compares its schedules. 

1) All possible pairs are generated by a combinations algorythm.

```
  const pairs = employees.flatMap((v, i) =>
    employees.slice(i + 1).map((w) => [v, w])
  );
```

2) Each pair of employees is proccesed to find **coincidences** of time intervals.

```
const comparePair = (pair) => {
  ...
  pair[0].intervals.forEach((firstInterval) => {
    pair[1].intervals.forEach((secondInterval) => {
      
      ...
    
    });
  }); ...
```
### Output - Coincidences found in a single pair.
```
  [["ASTRID", "ANDRES", 3]],
```

### Output - Coincidences found in several pairs.
```
    [
      ["ASTRID", "ANDRES", 3],
      ["ASTRID", "RENE", 2],
    ]
```

3) Finally the results are evaluated by the ```validate``` method . 

## SOLUTION SCOPE

It is possible to:

- [x] Add, modify or remove employees from any exercise as well as their work schedules defined as (intervals). 

- [x] Edit the [examples.json](./examples.json) file to modify or add more examples, 
just remember to do as well with the correspondent test case definition. 

Note: You can find the test case definitions in the [index.ts](./index.ts) file.

```
const testCases: TestCase[] = [
  {
    testNumber: 1,
    employees: example1 as Employee[],
    expectedResult: [
      ["ASTRID", "ANDRES", 3],
      ["ASTRID", "RENE", 2],
      ["ANDRES", "RENE", 2],
    ],
  } ...
```










