import { input, example, example2 } from "./input";

const DIGITS: Record<string, number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const getDigit = (value?: string) => {
  if (!value) return null;
  return DIGITS[value] || +value;
};

export const solution1 = (value: string) => {
  const lines = value.split("\n");
  let accum = 0;

  for (const line of lines) {
    const characters = line
      .split("")
      .map((c) => +c)
      .filter(Boolean);
    const firstDigit = characters.shift() || 0;
    const lastDigit = characters.pop() || firstDigit;

    const data = +`${firstDigit}${lastDigit}`;

    accum += data;
  }

  return accum;
};

export const solution2 = (value: string) => {
  const lines = value.split("\n").filter((line) => line.length);
  let accum = 0;

  for (let line of lines) {
    const matches: string[] = [];
    let lastMatchIdx: number | undefined = undefined;

    for (let i = 0; i < line.length; i++) {
      const match = line
        .slice(i)
        .match(/one|two|three|four|five|six|seven|eight|nine|\d/i);

      if (!match) {
        continue;
      }
      if (!lastMatchIdx || lastMatchIdx - 1 !== match.index) {
        matches.push(match[0]);
        lastMatchIdx = match.index;
      } else {
        lastMatchIdx--;
      }
    }

    const firstDigit = getDigit(matches?.shift()) || 0;
    const lastDigit = getDigit(matches?.pop()) || firstDigit;

    const data = +`${firstDigit}${lastDigit}`;
    accum += data;
  }

  return accum;
};

const res1 = solution1(input);

const res2 = solution2(input);

console.log("solution 1:", res1);
console.log("solution 2:", res2);
