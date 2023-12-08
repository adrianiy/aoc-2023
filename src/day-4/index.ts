import { example, input } from "./input";

export const solution1 = (value: string): number => {
  let solution = 0;

  const lines = value.split("\n").filter((line) => line.length);

  for (const line of lines) {
    const [winning, owned] = line.split(":")[1].split("|");

    const winningNumbers = winning
      .trim()
      .split(" ")
      .filter((n) => n.length)
      .map((n) => +n);
    const ownedNumbers = owned
      .trim()
      .split(" ")
      .filter((n) => n.length)
      .map((n) => +n);
    const matches = new Set();

    for (const number of ownedNumbers) {
      if (winningNumbers.includes(number)) {
        matches.add(number);
      }
    }

    if (matches.size) {
      solution += 2 ** (matches.size - 1);
    }
  }

  return solution;
};

export const solution2 = (value: string): number => {
  const lines = value.split("\n").filter((line) => line.length);
  const instances: Record<number, number> = {};

  lines.forEach((_, idx) => (instances[idx] = 1));

  for (let i = 0; i < lines.length; i++) {
    const [winning, owned] = lines[i].split(":")[1].split("|");

    const winningNumbers = winning
      .trim()
      .split(" ")
      .filter((n) => n.length)
      .map((n) => +n);
    const ownedNumbers = owned
      .trim()
      .split(" ")
      .filter((n) => n.length)
      .map((n) => +n);
    const matches = new Set();

    for (const number of ownedNumbers) {
      if (winningNumbers.includes(number)) {
        matches.add(number);
      }
    }

    if (matches.size) {
      let copies = instances[i]!;

      while (copies) {
        let size = matches.size;

        while (size && i + size < lines.length) {
          instances[i + size] = instances[i + size]! + 1;
          size--;
        }
        copies--;
      }
    }
  }

  return Object.values(instances).reduce((acc, curr) => acc + (curr || 0), 0);
};

export default () => {
  const res1 = solution1(input);
  const res2 = solution2(input);

  console.log(`Solution 1: ${res1}`);
  console.log(`Solution 2: ${res2}`);
};
