import { Resources, Robots, decreaseResources, increaseResources } from '../interfaces/Resources';

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

export class Blueprint {
  public readonly id: number;
  private oreRobot: OreRobot;
  private clayRobot: ClayRobot;
  private obsidianRobot: ObsidianRobot;
  private geodeRobot: GeodeRobot;
  private maxOreRobots: number;
  private maxClayRobots: number;
  private maxObsidianRobots: number;

  public constructor(input: string) {
    const numbers = [...input.matchAll(/\d+/g)].map((match) => parseInt(match[0]));

    this.id = numbers[0];
    this.oreRobot = { ore: numbers[1] };
    this.clayRobot = { ore: numbers[2] };
    this.obsidianRobot = { ore: numbers[3], clay: numbers[4] };
    this.geodeRobot = { ore: numbers[5], obsidian: numbers[6] };

    this.maxOreRobots = Math.max(this.clayRobot.ore, this.obsidianRobot.ore, this.geodeRobot.ore);
    this.maxClayRobots = this.obsidianRobot.clay;
    this.maxObsidianRobots = this.geodeRobot.obsidian;
  }

  // Build Functions!

  public buildOreRobot(resources: Resources, robots: Robots) {
    robots.ore += 1;
    resources.ore -= this.oreRobot.ore;
  }

  public buildClayRobot(resources: Resources, robots: Robots) {
    robots.clay += 1;
    resources.ore -= this.clayRobot.ore;
  }

  public buildObsidianRobot(resources: Resources, robots: Robots) {
    robots.obsidian += 1;
    resources.ore -= this.obsidianRobot.ore;
    resources.clay -= this.obsidianRobot.clay;
  }

  public buildGeodeRobot(resources: Resources, robots: Robots) {
    robots.geode += 1;
    resources.ore -= this.geodeRobot.ore;
    resources.obsidian -= this.geodeRobot.obsidian;
  }

  // Unbuild Functions!

  private unbuildOreRobot(resources: Resources, robots: Robots) {
    robots.ore -= 1;
    resources.ore += this.oreRobot.ore;
  }

  private unbuildClayRobot(resources: Resources, robots: Robots) {
    robots.clay -= 1;
    resources.ore += this.clayRobot.ore;
  }

  private unbuildObsidianRobot(resources: Resources, robots: Robots) {
    robots.obsidian -= 1;
    resources.ore += this.obsidianRobot.ore;
    resources.clay += this.obsidianRobot.clay;
  }

  // Can Build Functions!
  public canBuildOreRobot(resources: Resources, robots: Robots): boolean {
    return this.oreRobot.ore <= resources.ore && robots.ore < this.maxOreRobots;
  }

  public canBuildClayRobot(resources: Resources, robots: Robots): boolean {
    return this.clayRobot.ore <= resources.ore && robots.clay < this.maxClayRobots;
  }

  public canBuildObsidianRobot(resources: Resources, robots: Robots): boolean {
    return (
      this.obsidianRobot.ore <= resources.ore &&
      this.obsidianRobot.clay <= resources.clay &&
      robots.obsidian < this.maxObsidianRobots
    );
  }

  public canBuildGeodeRobot(resources: Resources): boolean {
    return this.geodeRobot.ore <= resources.ore && this.geodeRobot.obsidian <= resources.obsidian;
  }

  // Should Build Functions!
  public shouldBuildOreRobot(resources: Resources, robots: Robots): boolean {
    // Turns needed to build a Geode, Obsidian and Clay Robot if waited ...
    const turnsNeededIfWaitedForGeode = this.turnsNeededToBuildGeodeRobot(resources, robots);
    const turnsNeededIfWaitedForObsidian = this.turnsNeededToBuildObsidianRobot(resources, robots);
    const turnsNeededIfWaitedForClay = this.turnsNeededToBuildClayRobot(resources, robots);

    // Turns needed to build a Geode, Obsidian and Clay Robot if Ore Robot is built first ...
    this.buildOreRobot(resources, robots);
    const turnsNeededIfBuiltForGeode = this.turnsNeededToBuildGeodeRobot(resources, robots);
    const turnsNeededIfBuiltForObsidian = this.turnsNeededToBuildObsidianRobot(resources, robots);
    const turnsNeededIfBuiltForClay = this.turnsNeededToBuildClayRobot(resources, robots);
    this.unbuildOreRobot(resources, robots);

    // We should only build the Ore Robot if it does not affect when we can build the Geode, Obsidian or Clay Robot!
    return (
      turnsNeededIfBuiltForGeode < turnsNeededIfWaitedForGeode &&
      turnsNeededIfBuiltForObsidian < turnsNeededIfWaitedForObsidian &&
      turnsNeededIfBuiltForClay < turnsNeededIfWaitedForClay
    );
  }

  public shouldBuildClayRobot(resources: Resources, robots: Robots): boolean {
    // Turns needed to build a Geode and Obsidian Robot if waited ...
    const turnsNeededIfWaitedForGeode = this.turnsNeededToBuildGeodeRobot(resources, robots);
    const turnsNeededIfWaitedForObsidian = this.turnsNeededToBuildObsidianRobot(resources, robots);

    // Turns needed to build a Geode and Obsidian Robot if Clay Robot is built first ...
    this.buildClayRobot(resources, robots);
    const turnsNeededIfBuiltForGeode = this.turnsNeededToBuildGeodeRobot(resources, robots);
    const turnsNeededIfBuiltForObsidian = this.turnsNeededToBuildObsidianRobot(resources, robots);
    this.unbuildClayRobot(resources, robots);

    // We should only build the Clay Robot if it does not affect when we can build the Geode Robot or Obsidian Robot!
    return (
      turnsNeededIfBuiltForGeode <= turnsNeededIfWaitedForGeode &&
      turnsNeededIfBuiltForObsidian <= turnsNeededIfWaitedForObsidian
    );
  }

  public shouldBuildObsidianRobot(resources: Resources, robots: Robots): boolean {
    // Turns needed to build a Geode Robot if waited ...
    const turnsNeededIfWaited = this.turnsNeededToBuildGeodeRobot(resources, robots);

    // Turns needed to build a Geode Robot if Obsidian Robot is built first ...
    this.buildObsidianRobot(resources, robots);
    const turnsNeededIfBuilt = this.turnsNeededToBuildGeodeRobot(resources, robots);
    this.unbuildObsidianRobot(resources, robots);

    // We should only build the Obsidian Robot if it does not affect when we can build the Geode Robot!
    return turnsNeededIfBuilt <= turnsNeededIfWaited;
  }

  // Turns Needed Functions!
  private turnsNeededToBuildClayRobot(resources: Resources, robots: Robots): number {
    const turnsNeededForOre = Math.ceil((this.clayRobot.ore - resources.ore) / robots.ore);
    return Math.max(0, turnsNeededForOre);
  }

  private turnsNeededToBuildObsidianRobot(resources: Resources, robots: Robots): number {
    const turnsNeededForOre = Math.ceil((this.obsidianRobot.ore - resources.ore) / robots.ore);
    const turnsNeededForClay = Math.ceil((this.obsidianRobot.clay - resources.clay) / robots.clay);
    return Math.max(0, turnsNeededForOre, turnsNeededForClay);
  }

  private turnsNeededToBuildGeodeRobot(resources: Resources, robots: Robots): number {
    const turnsNeededForOre = Math.ceil((this.geodeRobot.ore - resources.ore) / robots.ore);
    const turnsNeededForObsidian = Math.ceil((this.geodeRobot.obsidian - resources.obsidian) / robots.obsidian);
    return Math.max(0, turnsNeededForOre, turnsNeededForObsidian);
  }
}
