import { example, input } from "./input";

enum Destinations {
  seed = "seed",
  soil = "soil",
  fertilizer = "fertilizer",
  water = "water",
  light = "light",
  temperature = "temperature",
  humidity = "humidity",
  location = "location",
}

const DESTINATIONS = [
  Destinations.seed,
  Destinations.soil,
  Destinations.fertilizer,
  Destinations.water,
  Destinations.light,
  Destinations.temperature,
  Destinations.humidity,
  Destinations.location,
];

interface Mapping {
  source: Destinations;
  destination: Destinations;
  mappings: {
    sourceStart: number;
    destinationStart: number;
    range: number;
  }[];
}

const getMappings = (lines: string[]): Mapping[] => {
  const mappings: Mapping[] = [];

  let destination: Destinations = Destinations.seed;
  let source: Destinations = Destinations.soil;

  for (const line of lines.slice(1)) {
    if (!line.endsWith(":")) {
      const [destinationRangeStart, sourceRangeStart, range] = line
        .split(" ")
        .map((seed) => +seed);

      const mapping = mappings.find(
        (mapping) =>
          mapping.source === source && mapping.destination === destination
      );

      if (mapping) {
        mapping.mappings.push({
          sourceStart: sourceRangeStart,
          destinationStart: destinationRangeStart,
          range: range,
        });
      } else {
        mappings.push({
          source,
          destination,
          mappings: [
            {
              sourceStart: sourceRangeStart,
              destinationStart: destinationRangeStart,
              range: range,
            },
          ],
        });
      }
    } else {
      [source, destination] = line.split(" ")[0].split("-to-") as [
        Destinations,
        Destinations
      ];
    }
  }

  return mappings;
};

export const solutuion1 = (input: string): number => {
  const lines = input.split("\n").filter((line) => line.length > 0);

  const seeds = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((seed) => +seed);

  const mappings = getMappings(lines);

  let lowestLocation = Infinity;

  for (const seed of seeds) {
    let searchElement = seed;
    for (let i = 0; i < DESTINATIONS.length; i++) {
      const source = DESTINATIONS[i];
      const destination = DESTINATIONS[i + 1];

      const mapping = mappings.find(
        (mapping) =>
          mapping.source === source && mapping.destination === destination
      );

      if (mapping) {
        const inRange = mapping.mappings.find(
          (mapping) =>
            mapping.sourceStart <= searchElement &&
            mapping.sourceStart + mapping.range > searchElement
        );

        if (inRange) {
          const sourceDelta = searchElement - inRange.sourceStart;
          const destinationDelta = inRange.destinationStart + sourceDelta;

          searchElement = destinationDelta;
        }
      }
    }

    if (searchElement < lowestLocation) {
      lowestLocation = searchElement;
    }
  }

  return lowestLocation;
};

export const solutuion2 = (input: string): number => {
  const lines = input.split("\n").filter((line) => line.length > 0);

  const seeds = lines[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .map((seed) => +seed);

  const mappings = getMappings(lines);
  let lowestLocation =
    mappings
      .find((m) => m.destination === Destinations.location)
      ?.mappings.sort((a, b) => b.destinationStart - a.destinationStart)[0]
      .destinationStart || Infinity;
  for (let i = 0; i <= seeds.length; i += 2) {
    for (let j = 0; j <= seeds[i + 1]; j++) {
      let searchElement = seeds[i] + j;
      let location: any;
      for (let i = 0; i < DESTINATIONS.length; i++) {
        const source = DESTINATIONS[i];
        const destination = DESTINATIONS[i + 1];

        const mapping = mappings.find(
          (mapping) =>
            mapping.source === source && mapping.destination === destination
        );

        if (mapping) {
          const inRange = mapping.mappings.find(
            (mapping) =>
              mapping.sourceStart <= searchElement &&
              mapping.sourceStart + mapping.range > searchElement
          );

          if (inRange) {
            const sourceDelta = searchElement - inRange.sourceStart;
            const destinationDelta = inRange.destinationStart + sourceDelta;

            searchElement = destinationDelta;
            if (destination === Destinations.location) {
              location = inRange;
            }
          }
        }
      }

      if (searchElement < lowestLocation) {
        if (location) {
          j += location.range;
        } else {
          j = seeds[i + 1];
        }
        lowestLocation = searchElement;
      }
    }
  }
  return lowestLocation;
};

// const res1 = solutuion1(input);
const res2 = solutuion2(input);

// console.log("Solution 1: ", res1);
console.log("Solution 2: ", res2);
