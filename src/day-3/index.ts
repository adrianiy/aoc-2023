import { example, input } from "./input";

const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

enum Direction {
  LEFT = 'left',
  RIGHT = 'right',
  BOTH = 'both',
}

const checkIsTouching = (matrix: string[][], i: number, j: number) => {
  return DIRECTIONS.some(([x, y]) => {
    const value = matrix[i + x]?.[j + y];

    return value && value !== "." && isNaN(+value);
  });
};

const getNumber = (row: string[], i: number, direction: Direction): string => {
  if (!row[i] || isNaN(+row[i])) {
    return '';
  }

  const value = row[i];

  row[i] = '.'

  const prevNumber = [Direction.LEFT, Direction.BOTH].includes(direction) ? getNumber(row, i-1, Direction.LEFT) : '';
  const nextNumber = [Direction.RIGHT, Direction.BOTH].includes(direction) ? getNumber(row, i+1, Direction.RIGHT) : '';

  return `${prevNumber}${value}${nextNumber}`;
}

const getAdjacentNumbers = (matrix: string[][], i: number, j: number) => {
  const adjacentNumbers: string[] = [];

  DIRECTIONS.forEach(([x, y]) => {
    const value = matrix[i + x]?.[j + y];

    if (value && !isNaN(+value)) {
      adjacentNumbers.push(getNumber(matrix[i + x], j + y, Direction.BOTH));
    }
  });

  return adjacentNumbers;
}

export const solution1 = (value: string): number => {
  let solution = 0;

  const matrix = value
    .split("\n")
    .filter((line) => line.length)
    .map((line) => line.split(""));

  for (let i = 0; i < matrix.length; i++) {
    let lastDigit: string[] = [];
    let touchingSymbol = false;

    for (let j = 0; j < matrix[0].length; j++) {
      const value = matrix[i][j];

      if (isNaN(+value)) {
        if (touchingSymbol) {
          solution += +lastDigit.join("");
        }
        touchingSymbol = false;
        lastDigit = [];

        continue;
      } else {
        lastDigit.push(value);
        touchingSymbol = touchingSymbol || checkIsTouching(matrix, i, j);
      }
    }

    if (touchingSymbol) {
      solution += +lastDigit.join("");
    }
  }

  return solution;
};

export const solution2 = (value: string): number => {
  let solution = 0;

  const matrix = value
    .split("\n")
    .filter((line) => line.length)
    .map((line) => line.split(""));
  
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const value = matrix[i][j];

      if (value === '*') {
        const adjacentNumbers = getAdjacentNumbers(matrix, i, j);

        if (adjacentNumbers.length >= 2) {
          const ratio = adjacentNumbers.reduce((acc, curr) => acc * +curr, 1);
          
          solution += ratio;
        }
      }
    }
  }

  return solution;
}

const res1 = solution1(input);
const res2 = solution2(input);

console.log(`Solution 1: ${res1}`);
console.log(`Solution 2: ${res2}`);
