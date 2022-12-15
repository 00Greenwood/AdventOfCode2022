import { ArgumentParser } from 'argparse';
import { copyFileSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const parser = new ArgumentParser({
  description: 'Generator for Advent of Code!',
});
parser.add_argument('--day', {
  type: 'int',
  help: 'The day to generate.',
  required: true,
});

const day = parser.parse_args().day;

// Copy Text Input
copyFileSync(
  path.resolve(__dirname, '../inputs/Day0.test.txt'),
  path.resolve(__dirname, `../inputs/Day${day}.test.txt`)
);

// Copy Input
copyFileSync(path.resolve(__dirname, '../inputs/Day0.txt'), path.resolve(__dirname, `../inputs/Day${day}.txt`));

// Read & Write Source
let source = readFileSync(path.resolve(__dirname, '../src/days/Day0.ts'), 'utf-8');
source = source.replaceAll('0', day);
writeFileSync(path.resolve(__dirname, `../src/days/Day${day}.ts`), source, 'utf-8');

// Copy Test
let test = readFileSync(path.resolve(__dirname, '../src/tests/Day0.test.ts'), 'utf-8');
test = test.replaceAll('0', day);
writeFileSync(path.resolve(__dirname, `../src/tests/Day${day}.test.ts`), test, 'utf-8');
