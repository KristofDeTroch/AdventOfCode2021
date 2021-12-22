import fs from 'fs';

const minX = 50;
const reactorSize = 101;

fs.readFile('day22/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n').filter((s: string) => s != '');
  let cubes = Array.apply(null, Array(reactorSize)).map(function () { return Array.apply(null, Array(reactorSize)).map(function () { return Array.apply(null, Array(reactorSize)).map(function () { return 0; }); }); })
  for (let line of data) {
    let input = getRange(line);
    let value = line.startsWith('on') ? 1 : 0;
    for (let x = Math.max(input[0][0], 0); x <= Math.min(input[0][1], 100); x++) {
      for (let y = Math.max(input[1][0], 0); y <= Math.min(input[1][1], 100); y++) {
        for (let z = Math.max(input[2][0], 0); z <= Math.min(input[2][1], 100); z++) {
          cubes[x][y][z] = value;
        }
      }
    }

  }
  console.log(cubes.reduce((prev, curr) => prev + curr.reduce((pre, cur) => pre + cur.filter((n: number) => n == 1).length, 0), 0))

});

function getRange(line: string): number[][] {
  let result: number[][] = []
  for (let _ = 0; _ < 3; _++) {

    let startIndex = line.indexOf('=') + 1;
    let endIndex = line.indexOf('.');
    let min = parseInt(line.slice(startIndex, endIndex)) + minX;
    startIndex = endIndex + 2;
    endIndex = line.indexOf(',');
    let max = parseInt(_ == 2 ? line.slice(startIndex) : line.slice(startIndex, endIndex)) + minX;
    result.push([min, max])
    line = line.slice(endIndex + 1);
  }

  return result;
}