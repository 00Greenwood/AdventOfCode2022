export interface Resources {
  ore: number;
  clay: number;
  obsidian: number;
  geode: number;
}

export type Robots = Resources;

export const increaseResources = (resources: Resources, robots: Robots) => {
  resources.ore += robots.ore;
  resources.clay += robots.clay;
  resources.obsidian += robots.obsidian;
  resources.geode += robots.geode;
};

export const decreaseResources = (resources: Resources, robots: Robots) => {
  resources.ore -= robots.ore;
  resources.clay -= robots.clay;
  resources.obsidian -= robots.obsidian;
  resources.geode -= robots.geode;
};
