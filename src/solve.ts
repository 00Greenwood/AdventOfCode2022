import { ArgumentParser } from "argparse";
import { Day } from "./Day";
import { Day0 } from "./Day0";
import { Day1 } from "./Day1";
import { Day2 } from "./Day2";
import { Day3 } from "./Day3";

const parser = new ArgumentParser({
  description: "Solver for Advent of Code 2022!",
});
parser.add_argument("--day", {
  type: "int",
  help: "The day to solve. If not supplied, every day is solved.",
});

// Construct an array of every day.
const days = new Array<Day>();
days.push(new Day0());
days.push(new Day1());
days.push(new Day2());
days.push(new Day3());

const args = parser.parse_args();

switch (args.day) {
  case 0:
  case 1:
  case 2:
  case 3:
    days[args.day].solve();
    break;
  default:
    // By default, solve every day.
    days.forEach((day) => day.solve());
}
