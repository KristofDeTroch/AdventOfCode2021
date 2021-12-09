import fs from 'fs';

const DR: number[] = [0, 1, 0, -1];
const DC: number[] = [1, 0, -1, 0];

fs.readFile('day09/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: number[][] = input.split('\n').filter((s: string) => s != '').map((s: string) => [...s].map((c: string) => parseInt(c)));
  let risk = 0;
  let basins: number[] = [];
  const rLength = data.length;
  const cLength = data[0].length;
  for (let i = 0; i < rLength; i++) {
    for (let j = 0; j < cLength; j++) {
      const height = data[i][j];
      if ((i == rLength - 1 || height < data[i + 1][j])
        && (i == 0 || height < data[i - 1][j])
        && (j == cLength - 1 || height < data[i][j + 1])
        && (j == 0 || height < data[i][j - 1])) {

        risk += height + 1;
        basins.push(calculateBasin(data, i, j));
      }
    }
  }
  console.log(risk)
  basins.sort((a: number, b: number) => b - a);
  console.log(basins[0] * basins[1] * basins[2]);
});


function calculateBasin(data: number[][], x: number, y: number): number {
  let basin: number[][] = [[x, y]];

  calculateRing(data, x, y, basin)
  return basin.length;
}

function calculateRing(data: number[][], x: number, y: number, seen: number[][]) {
  const rLength = data.length
  const cLength = data[0].length
  for (let i = 0; i < DR.length; i++) {
    const xx = x + DR[i];
    const yy = y + DC[i];
    if (0 <= xx && xx < rLength && 0 <= yy && yy < cLength && data[xx][yy] != 9 && !seen.some((a: number[]) => a[0] == xx && a[1] == yy)) {
      seen.push([xx, yy]);
      calculateRing(data, xx, yy, seen)
    }
  }

}