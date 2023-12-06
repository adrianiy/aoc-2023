# Almanac

The almanac (your puzzle input) lists all of the seeds that need to be planted.
It also lists what type of soil to use with each kind of seed, what type of 
fertilizer to use with each kind of soil, what type of water to 
use with each kind of fertilizer, and so on.
Every type of seed, soil, fertilizer and so on is identified with a number,
but numbers are reused by each category - that is, 
soil 123 and fertilizer 123 aren't necessarily related to each other.

```
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
```
The almanac starts by listing which seeds need to be planted: seeds 79, 14, 55, and 13.

The rest of the almanac contains a list of maps which describe how to convert 
numbers from a source category into numbers in a destination category.
That is, the section that starts with seed-to-soil map: describes how to convert a 
seed number (the source) to a soil number (the destination).
This lets the gardener and his team know which soil to use with which seeds,
which water to use with which fertilizer, and so on.
