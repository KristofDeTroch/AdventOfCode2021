import fs from 'fs';

fs.readFile('day13/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n');
  const seperator = data.indexOf('');
  let dots: number[][] = data.slice(0, seperator).map((s: string) => s.split(',').map((n: string) => parseInt(n)));
  let folds: any = data.slice(seperator).filter((s: string) => s != '').map((line: string) => [line.slice(line.indexOf('=') - 1, line.indexOf('=')), parseInt(line.slice(line.indexOf('=') + 1))]);

  let newDots: number[][];
  let numberOfDots: number[] = [];
  for (const fold of folds) {
    if (fold[0] == 'x') {
      newDots = dots.map((dot: number[]) => {
        if (dot[0] < fold[1]) {
          return dot;
        } else {
          return [fold[1] - (dot[0] - fold[1]), dot[1]]
        }
      })
      dots = newDots.filter((dot: number[], index: number) => !newDots.slice(index + 1).some((nextDot: number[]) => dot[0] == nextDot[0] && dot[1] == nextDot[1]))
    } else {
      newDots = dots.map((dot: number[]) => {
        if (dot[1] < fold[1]) {
          return dot;
        } else {
          return [dot[0], fold[1] - (dot[1] - fold[1])]
        }
      })
      dots = newDots.filter((dot: number[], index: number) => !newDots.slice(index + 1).some((nextDot: number[]) => dot[0] == nextDot[0] && dot[1] == nextDot[1]))

    }
    numberOfDots.push(dots.length);
  }
  console.log(numberOfDots[0])
  printDots(dots)
});

function printDots(dots: number[][]) {
  let X = Math.max(...dots.map((n: number[]) => n[0]));
  let Y = Math.max(...dots.map((n: number[]) => n[1]));
  for (let y = 0; y <= Y; y++) {
    let string = "";
    for (let x = 0; x <= X; x++) {
      if (dots.filter((dot: number[]) => dot[0] == x && dot[1] == y).length == 1) {
        string += '#';
      } else {
        string += ".";
      }
    }
    console.log(string)
  }
}