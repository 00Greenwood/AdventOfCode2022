import { ArgumentParser } from "argparse";
import { Day } from "./Day";
import { Day0 } from "./Day0";

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

const args = parser.parse_args();

switch (args.day) {
  case 0:
    days[0].solve();
    break;
  default:
    // By default, solve every day.
    days.forEach((day) => day.solve());
}
