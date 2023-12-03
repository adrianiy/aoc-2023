import { input, example } from "./input";

const CONFIGURATION: Record<string, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

const checkGame = (subsets: string[]) => {
  for (const subset of subsets) {
    const cubes = subset.split(",");

    for (const cube of cubes) {
      const [value, color] = cube.trim().split(" ");
      
      if (CONFIGURATION[color] < +value) {
        throw new Error(`Game is invalid`);
      }
    }
  }
};

const checkMinConfig = (subsets: string[]) => {
  const minValues: Record<string, number> = {
    red: 0,
    green: 0,
    blue: 0,
  }
  for (const subset of subsets) {
    const cubes = subset.split(',');

    for (const cube of cubes) {
      const [value, color] = cube.trim().split(' ');

      if (minValues[color] < +value) {
        minValues[color] = +value;
      }
    }
  }

  return Object.values(minValues);
}

export const solution1 = (value: string) => {
  const lines = value.split("\n").filter((line) => line.length);
  const validGames: number[] = [];
  const minConfigs: number[] = [];

  for (const game of lines) {
    const gameId = +game.split(":")[0].split(" ")[1];
    const subsets = game.split(":")[1].split(";");

    try {
      const minConfig = checkMinConfig(subsets);
      minConfigs.push(minConfig.reduce((acc, curr) => acc * curr, 1));
      checkGame(subsets);
      validGames.push(gameId);     
    } catch (error) {
      console.log(`Game ${gameId} is invalid`);
    }
  }
  return [
    validGames.reduce((acc, curr) => acc + curr, 0),
    minConfigs.reduce((acc, curr) => acc + curr, 0)
  ];
};

const [res1, res2] = solution1(input);

console.log(`Solution 1: ${res1} - Solution 2: ${res2}`);
