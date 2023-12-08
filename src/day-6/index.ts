import { example, input } from "./input";

interface Input {
  times: number[];
  distances: number[];
}

const parseKernel = (value: string): Input => {
  const lines = value.split("\n").filter((line) => line.length);
  const times = lines[0].split(":")[1].trim().split(/\s+/g).map((n) => +n);
  const distances = lines[1].split(":")[1].trim().split(/\s+/g).map((n) => +n);
  return { times, distances };
}

const parseKernel2 = (value: string): Input => {
  const lines = value.split("\n").filter((line) => line.length);
  const times = [+lines[0].split(":")[1].trim().replace(/\s+/g, "")];
  const distances = [+lines[1].split(":")[1].trim().replace(/\s+/g, "")];

  return { times, distances };
}

const getWinningGames = ({ times, distances }: Input): number => {
  const winningGames = Array(times.length).fill(0);

  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const distance = distances[i];

    for (let m = 1; m < time - 1; m++) {
      const remainingMs = time - m;

      const distanceTraveled = remainingMs * m;

      if (distanceTraveled > distance) {
        winningGames[i]++;
      }
    }

  }
  return winningGames.reduce((acc, curr) => acc * curr, 1);
}

export const solution1 = (value: string) => {
  return getWinningGames(parseKernel(value));
}

export const solution2 = (value: string) => {
  return getWinningGames(parseKernel2(value));
}

export default () => {
  const res1 = solution1(input);
  const res2 = solution2(input);
  console.log("solution 1", res1);
  console.log("solution 2", res2);
}
