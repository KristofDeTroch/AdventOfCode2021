import fs from 'fs';
const pX = [-1, 0, 1, 0]
const pY = [0, -1, 0, 1]


fs.readFile('day15/input.txt', 'utf-8', (_err: any, input: any) => {
  let data: number[][] = input.split('\n').filter((s: string) => s != '').map((s: string) => [...s].map((c: string) => parseInt(c)));
  console.log(solve(data, 5))
});

function solve(data: number[][], tileSize: number): number {
  const ySize = data.length;
  const xSize = data[0].length;
  let field: number[][] = [];
  for (let y = 0; y < ySize * tileSize; y++) {
    let line: number[] = [];
    for (let x = 0; x < xSize * tileSize; x++) {
      line.push(1e9)
    }
    field.push(line)
  }
  field[0][0] = 0;

  let queue: [number, number][] = [[1, 0], [0, 1]];
  while (queue.length > 0) {
    let coordinate = queue.pop();
    if (coordinate != undefined) {
      let [y, x] = coordinate;
      let d = data[y % ySize][x % xSize] + Math.floor(y / ySize) + Math.floor(x / xSize);
      while (d > 9) {
        d -= 9;
      }
      let value = d + Math.min(
        x > 0 ? field[y][x - 1] : 1e9,
        x < xSize * tileSize - 1 ? field[y][x + 1] : 1e9,
        y > 0 ? field[y - 1][x] : 1e9,
        y < ySize * tileSize - 1 ? field[y + 1][x] : 1e9
      )
      if (value < field[y][x]) {
        field[y][x] = value;
        for (let i = 0; i < 4; i++) {
          let xx = x + pX[i];
          let yy = y + pY[i];
          if (0 <= xx && xx < xSize * tileSize && 0 <= yy && yy < ySize * tileSize) {
            queue.push([yy, xx])
          }
        }
      }
    }

  }
  return field[(ySize * tileSize) - 1][(xSize * tileSize) - 1];
}