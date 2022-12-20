import { Day, Output } from '../Day';

interface Item {
  prev: Item;
  value: number;
  next: Item;
}

type List = Item[];

export class Day20 extends Day {
  public constructor() {
    super('Day20');
  }

  private parseInput(input: string): List {
    const items: List = input.split('\n').map((line) => ({ value: parseInt(line) } as Item));
    for (let i = 0; i < items.length - 1; i++) {
      items[i].next = items[i + 1];
      items[i + 1].prev = items[i];
    }
    items[0].prev = items[items.length - 1];
    items[items.length - 1].next = items[0];
    return items;
  }

  private mix(item: Item, listLength: number) {
    const toMove = item.value % (listLength - 1);
    if (toMove > 0) {
      for (let i = 0; i < toMove; i++) {
        const prev = item.prev;
        const next = item.next;
        const nextNext = next.next;
        prev.next = next;
        next.prev = prev;
        next.next = item;
        item.prev = next;
        item.next = nextNext;
        nextNext.prev = item;
      }
    } else if (toMove < 0) {
      for (let i = toMove; i < 0; i++) {
        const prev = item.prev;
        const prevPrev = prev.prev;
        const next = item.next;
        prev.next = next;
        next.prev = prev;
        prev.prev = item;
        item.prev = prevPrev;
        item.next = prev;
        prevPrev.next = item;
      }
    }
  }

  private findPosition(items: List, position: number): Item {
    let counter = 0;
    let next = items.find((item) => item.value === 0);
    while (next) {
      next = next.next;
      if (++counter >= position) break;
    }
    if (!next) throw new Error('Unable to find item at position!');
    return next;
  }

  public solvePartOne(input: string): Output {
    const items = this.parseInput(input);
    for (const item of items) {
      this.mix(item, items.length);
    }
    const itemOne = this.findPosition(items, 1000);
    const itemTwo = this.findPosition(items, 2000);
    const itemThree = this.findPosition(items, 3000);
    return itemOne.value + itemTwo.value + itemThree.value;
  }

  public solvePartTwo(input: string): Output {
    const items = this.parseInput(input);
    items.forEach((item) => (item.value *= 811589153));
    for (let i = 0; i < 10; i++) {
      for (const item of items) {
        this.mix(item, items.length);
      }
    }
    const itemOne = this.findPosition(items, 1000);
    const itemTwo = this.findPosition(items, 2000);
    const itemThree = this.findPosition(items, 3000);
    return itemOne.value + itemTwo.value + itemThree.value;
  }
}
