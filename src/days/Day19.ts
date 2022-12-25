import { Day, Output } from '../Day';

type Build = 'WAIT' | 'ORE' | 'CLAY' | 'OBSIDIAN' | 'GEODE';
type BuildQueue = Build[];

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
}

interface Resources {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

type Robots = Resources;

const increaseResources = (resources: Resources, robots: Robots) => {
  resources.ore += robots.ore;
  resources.clay += robots.clay;
  resources.obsidian += robots.obsidian;
  resources.geode += robots.geode;
};

const buildOreRobot = (resources: Resources, robots: Robots, { oreRobot }: Blueprint) => {
  robots.ore += 1;
  resources.ore -= oreRobot.ore;
};

const buildClayRobot = (resources: Resources, robots: Robots, { clayRobot }: Blueprint) => {
  robots.clay += 1;
  resources.ore -= clayRobot.ore;
};

const buildObsidianRobot = (resources: Resources, robots: Robots, { obsidianRobot }: Blueprint) => {
  robots.obsidian += 1;
  resources.ore -= obsidianRobot.ore;
  resources.clay -= obsidianRobot.clay;
};

const buildGeodeRobot = (resources: Resources, robots: Robots, { geodeRobot }: Blueprint) => {
  robots.geode += 1;
  resources.ore -= geodeRobot.ore;
  resources.obsidian -= geodeRobot.obsidian;
};

const calculateResources = (buildQueue: BuildQueue, blueprint: Blueprint): Resources => {
  const resources: Resources = { ore: 0, clay: 0, obsidian: 0, geode: 0 };
  const robots: Robots = { ore: 1, clay: 0, obsidian: 0, geode: 0 };

  for (const build of buildQueue) {
    switch (build) {
      case 'WAIT':
        increaseResources(resources, robots);
        break;
      case 'ORE':
        increaseResources(resources, robots);
        buildOreRobot(resources, robots, blueprint);
        break;
      case 'CLAY':
        increaseResources(resources, robots);
        buildClayRobot(resources, robots, blueprint);
        break;
      case 'OBSIDIAN':
        increaseResources(resources, robots);
        buildObsidianRobot(resources, robots, blueprint);
        break;
      case 'GEODE':
        increaseResources(resources, robots);
        buildGeodeRobot(resources, robots, blueprint);
        break;
    }
  }
  return resources;
};

const generateBuildQueue = (blueprint: Blueprint, size: number) => {
  const buildQueue: BuildQueue = [];

  const maxOreRobots = Math.max(
    blueprint.oreRobot.ore,
    blueprint.clayRobot.ore,
    blueprint.obsidianRobot.ore,
    blueprint.geodeRobot.ore
  );
  const maxClayRobots = blueprint.obsidianRobot.clay;
  const maxObsidianRobots = blueprint.geodeRobot.obsidian;

  const resources = calculateResources(buildQueue, blueprint);
};

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
      };
    });
  }

  public solvePartOne(input: string): Output {
    const blueprints = this.parseInput(input);

    generateBuildQueue(blueprints[0], 24);

    return 0;
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
