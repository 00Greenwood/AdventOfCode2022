import { Day, Output } from '../Day';

interface OreRobot {
  ore: number;
}

interface ClayRobot {
  ore: number;
}

interface ObsidianRobot {
  ore: number;
  clay: number;
}

interface GeodeRobot {
  ore: number;
  obsidian: number;
}

interface Blueprint {
  id: number;
  oreRobot: OreRobot;
  clayRobot: ClayRobot;
  obsidianRobot: ObsidianRobot;
  geodeRobot: GeodeRobot;
  maxOreRobot: number;
  maxClayRobot: number;
  maxObsidianRobot: number;
}

interface Resources {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

type Robots = Resources;

export class Day19 extends Day {
  public constructor() {
    super('Day19');
  }

  private parseInput(input: string): Blueprint[] {
    return input.split('\n').map((line) => {
      const numbers = [...line.matchAll(/\d+/g)].map((match) => parseInt(match[0]));

      const oreRobot: OreRobot = { ore: numbers[1] };
      const clayRobot: ClayRobot = { ore: numbers[2] };
      const obsidianRobot: ObsidianRobot = { ore: numbers[3], clay: numbers[4] };
      const geodeRobot: GeodeRobot = { ore: numbers[5], obsidian: numbers[6] };

      return {
        id: numbers[0],
        oreRobot,
        clayRobot,
        obsidianRobot,
        geodeRobot,
        maxOreRobot: Math.max(oreRobot.ore, clayRobot.ore, obsidianRobot.ore, geodeRobot.ore),
        maxClayRobot: obsidianRobot.clay,
        maxObsidianRobot: geodeRobot.obsidian,
      };
    });
  }

  private buildOreRobot(resources: Resources, robots: Robots, { maxOreRobot, oreRobot }: Blueprint): boolean {
    if (robots.ore >= maxOreRobot) return false;
    if (resources.ore < oreRobot.ore) return false;
    this.increaseResources(resources, robots);
    robots.ore += 1;
    resources.ore -= oreRobot.ore;
    return true;
  }

  private unbuildOreRobot(resources: Resources, robots: Robots, { oreRobot }: Blueprint) {
    robots.ore -= 1;
    resources.ore += oreRobot.ore;
    this.decreaseResources(resources, robots);
  }

  private buildClayRobot(resources: Resources, robots: Robots, { clayRobot, maxClayRobot }: Blueprint): boolean {
    if (robots.clay >= maxClayRobot) return false;
    if (resources.ore < clayRobot.ore) return false;
    this.increaseResources(resources, robots);
    robots.clay += 1;
    resources.ore -= clayRobot.ore;
    return true;
  }

  private unbuildClayRobot(resources: Resources, robots: Robots, { clayRobot }: Blueprint) {
    robots.clay -= 1;
    resources.ore += clayRobot.ore;
    this.decreaseResources(resources, robots);
  }

  private buildObsidianRobot(
    resources: Resources,
    robots: Robots,
    { obsidianRobot, maxObsidianRobot }: Blueprint
  ): boolean {
    if (robots.obsidian >= maxObsidianRobot) return false;
    if (resources.ore < obsidianRobot.ore || resources.clay < obsidianRobot.clay) return false;
    this.increaseResources(resources, robots);
    robots.obsidian += 1;
    resources.ore -= obsidianRobot.ore;
    resources.clay -= obsidianRobot.clay;
    return true;
  }

  private unbuildObsidianRobot(resources: Resources, robots: Robots, { obsidianRobot }: Blueprint) {
    robots.obsidian -= 1;
    resources.ore += obsidianRobot.ore;
    resources.clay += obsidianRobot.clay;
    this.decreaseResources(resources, robots);
  }

  private buildGeodeRobot(resources: Resources, robots: Robots, { geodeRobot }: Blueprint): boolean {
    if (resources.ore < geodeRobot.ore || resources.obsidian < geodeRobot.obsidian) return false;
    this.increaseResources(resources, robots);
    robots.geode += 1;
    resources.ore -= geodeRobot.ore;
    resources.obsidian -= geodeRobot.obsidian;
    return true;
  }

  private unbuildGeodeRobot(resources: Resources, robots: Robots, { geodeRobot }: Blueprint) {
    robots.geode -= 1;
    resources.ore += geodeRobot.ore;
    resources.obsidian += geodeRobot.obsidian;
    this.decreaseResources(resources, robots);
  }

  private increaseResources(resources: Resources, robots: Robots) {
    resources.ore += robots.ore;
    resources.clay += robots.clay;
    resources.obsidian += robots.obsidian;
    resources.geode += robots.geode;
  }

  private decreaseResources(resources: Resources, robots: Robots) {
    resources.ore -= robots.ore;
    resources.clay -= robots.clay;
    resources.obsidian -= robots.obsidian;
    resources.geode -= robots.geode;
  }

  private runSimulation(
    time: number,
    resources: Resources,
    robots: Robots,
    blueprint: Blueprint,
    maxGeode: number
  ): number {
    time -= 1;

    if (time <= 0) {
      return resources.geode + robots.geode;
    }

    const possibleNumberOfGeodes = resources.geode + robots.geode * (time + 1) + (time / 2) * (2 * robots.geode + time);
    if (maxGeode > possibleNumberOfGeodes) return maxGeode;

    if (this.buildOreRobot(resources, robots, blueprint)) {
      const geode = this.runSimulation(time, resources, robots, blueprint, maxGeode);
      if (geode > maxGeode) maxGeode = geode;
      this.unbuildOreRobot(resources, robots, blueprint);
    }

    if (this.buildGeodeRobot(resources, robots, blueprint)) {
      const geode = this.runSimulation(time, resources, robots, blueprint, maxGeode);
      if (geode > maxGeode) maxGeode = geode;
      this.unbuildGeodeRobot(resources, robots, blueprint);
    }

    if (this.buildClayRobot(resources, robots, blueprint)) {
      const geode = this.runSimulation(time, resources, robots, blueprint, maxGeode);
      if (geode > maxGeode) maxGeode = geode;
      this.unbuildClayRobot(resources, robots, blueprint);
    }

    if (this.buildObsidianRobot(resources, robots, blueprint)) {
      const geode = this.runSimulation(time, resources, robots, blueprint, maxGeode);
      if (geode > maxGeode) maxGeode = geode;
      this.unbuildObsidianRobot(resources, robots, blueprint);
    }

    this.increaseResources(resources, robots);
    const geode = this.runSimulation(time, resources, robots, blueprint, maxGeode);
    if (geode > maxGeode) maxGeode = geode;
    this.decreaseResources(resources, robots);

    return maxGeode;
  }

  public solvePartOne(input: string): Output {
    const blueprints = this.parseInput(input);

    const resources: Resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
    const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };

    let result = 0;
    for (const blueprint of blueprints) {
      const geodes = this.runSimulation(24, resources, robots, blueprint, 0);
      result += blueprint.id * geodes;
    }
    return result;
  }

  public solvePartTwo(input: string): Output {
    const blueprints = this.parseInput(input);

    const resources: Resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
    const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };

    let result = 1;
    for (const blueprint of blueprints.slice(0, 3)) {
      const geodes = this.runSimulation(32, resources, robots, blueprint, 0);
      result *= geodes;
    }
    return result;
  }
}
