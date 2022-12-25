import { Day, Output } from '../Day';
import { Resources, Robots, increaseResources } from '../interfaces/Resources';
import { Blueprint } from '../utilities/Blueprint';

const runSimulation = (blueprint: Blueprint, runTime: number): Resources => {
  const resources: Resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
  const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };

  for (let i = 0; i < runTime; i++) {
    if (blueprint.canBuildGeodeRobot(resources)) {
      increaseResources(resources, robots);
      blueprint.buildGeodeRobot(resources, robots);
      console.log(i + 1, resources, robots);
      continue;
    }

    if (blueprint.canBuildObsidianRobot(resources, robots) && blueprint.shouldBuildObsidianRobot(resources, robots)) {
      increaseResources(resources, robots);
      blueprint.buildObsidianRobot(resources, robots);
      console.log(i + 1, resources, robots);
      continue;
    }

    if (blueprint.canBuildClayRobot(resources, robots) && blueprint.shouldBuildClayRobot(resources, robots)) {
      increaseResources(resources, robots);
      blueprint.buildClayRobot(resources, robots);
      console.log(i + 1, resources, robots);
      continue;
    }

    if (blueprint.canBuildOreRobot(resources, robots) && blueprint.shouldBuildOreRobot(resources, robots)) {
      increaseResources(resources, robots);
      blueprint.buildOreRobot(resources, robots);
      console.log(i + 1, resources, robots);
      continue;
    }

    // Wait ...
    increaseResources(resources, robots);
    console.log(i + 1, resources, robots);
  }

  return resources;
};

export class Day19 extends Day {
  public constructor() {
    super('Day19');
  }

  private parseInput(input: string): Blueprint[] {
    return input.split('\n').map((line) => new Blueprint(line));
  }

  public solvePartOne(input: string): Output {
    const blueprints = this.parseInput(input);

    let result = 0;
    for (const blueprint of blueprints) {
      const resources = runSimulation(blueprint, 24);
      result += blueprint.id * resources.geode;
    }

    return result;
  }

  public solvePartTwo(input: string): Output {
    const blueprints = this.parseInput(input);

    const resources: Resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
    const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };

    const result = 1;
    // for (const blueprint of blueprints.slice(0, 3)) {
    //   const geodes = this.runSimulation(32, resources, robots, blueprint, 0);
    //   result *= geodes;
    // }
    return result;
  }
}
