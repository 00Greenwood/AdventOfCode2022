import { Day, Output } from '../Day';

enum Results {
  Lose = 0,
  Draw = 3,
  Win = 6,
}

enum Options {
  Rock = 1,
  Paper = 2,
  Scissors = 3,
}

class Game {
  public readonly enemy: Options;
  public readonly response: Options;
  public readonly result: Results;

  public constructor(enemy: string, responseOrResult: string, isResponse: boolean) {
    this.enemy = this.parseOptions(enemy);
    if (isResponse) {
      this.response = this.parseOptions(responseOrResult);
      this.result = this.calculateResult();
    } else {
      this.result = this.parseResults(responseOrResult);
      this.response = this.calculateResponse();
    }
  }

  private parseOptions(input: string): Options {
    switch (input) {
      case 'A':
      case 'X':
        return Options.Rock;
      case 'B':
      case 'Y':
        return Options.Paper;
      case 'C':
      case 'Z':
        return Options.Scissors;
      default:
        throw new Error(`Unexpected Input: ${input}!`);
    }
  }

  private parseResults(input: string): Results {
    switch (input) {
      case 'X':
        return Results.Lose;
      case 'Y':
        return Results.Draw;
      case 'Z':
        return Results.Win;
      default:
        throw new Error(`Unexpected Input: ${input}!`);
    }
  }

  private calculateResult(): Results {
    switch (this.enemy) {
      case Options.Rock:
        switch (this.response) {
          case Options.Rock:
            return Results.Draw;
          case Options.Paper:
            return Results.Win;
          case Options.Scissors:
            return Results.Lose;
          default:
            throw new Error('Unexpected Option!');
        }
      case Options.Paper:
        switch (this.response) {
          case Options.Rock:
            return Results.Lose;
          case Options.Paper:
            return Results.Draw;
          case Options.Scissors:
            return Results.Win;
          default:
            throw new Error('Unexpected Option!');
        }
      case Options.Scissors:
        switch (this.response) {
          case Options.Rock:
            return Results.Win;
          case Options.Paper:
            return Results.Lose;
          case Options.Scissors:
            return Results.Draw;
          default:
            throw new Error('Unexpected Option!');
        }
      default:
        throw new Error('Unexpected Option!');
    }
  }

  private calculateResponse(): Options {
    switch (this.enemy) {
      case Options.Rock:
        switch (this.result) {
          case Results.Draw:
            return Options.Rock;
          case Results.Win:
            return Options.Paper;
          case Results.Lose:
            return Options.Scissors;
          default:
            throw new Error('Unexpected Result!');
        }
      case Options.Paper:
        switch (this.result) {
          case Results.Lose:
            return Options.Rock;
          case Results.Draw:
            return Options.Paper;
          case Results.Win:
            return Options.Scissors;
          default:
            throw new Error('Unexpected Result!');
        }
      case Options.Scissors:
        switch (this.result) {
          case Results.Win:
            return Options.Rock;
          case Results.Lose:
            return Options.Paper;
          case Results.Draw:
            return Options.Scissors;
          default:
            throw new Error('Unexpected Result!');
        }
      default:
        throw new Error('Unexpected Option!');
    }
  }
}

export class Day2 extends Day {
  public constructor() {
    super('Day2');
  }

  private parseInput(input: string, isPart1: boolean): Game[] {
    const games = input.split('\n');
    return games.map((game) => {
      const split = game.split(' ');
      return new Game(split[0], split[1], isPart1);
    });
  }

  public solvePartOne(input: string): Output {
    const games = this.parseInput(input, true);
    const score = games.reduce((score, game) => score + game.response + game.result, 0);
    return score;
  }

  public solvePartTwo(input: string): Output {
    const games = this.parseInput(input, false);
    const score = games.reduce((score, game) => score + game.response + game.result, 0);
    return score;
  }
}
