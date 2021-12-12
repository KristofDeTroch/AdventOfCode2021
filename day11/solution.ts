import fs from 'fs';

const X = [-1, -1, -1, 0, 1, 1, 1, 0];
const Y = [-1, 0, 1, 1, 1, 0, -1, -1];

fs.readFile('day11/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: number[][] = input.split('\n').filter((s: string) => s != '').map((s: string) => [...s].map((n: string) => parseInt(n)));
  let count = 0;
  let fCount = 0;
  let octopus = data;
  let step = 0;
  let tCount = 0
  while (true) {
    step += 1;
    [tCount, octopus] = execute(count, octopus);
    if (step == 100) {
      fCount = tCount;
    }
    if (tCount - count == 100) {
      break;
    }
    count = tCount;


  }
  console.log(fCount);
  console.log(step);

});

function execute(count: number, board: number[][]): [number, number[][]] {
  const xSize = board.length;
  const ySize = board[0].length;
  let queue: [number, number][] = [];
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      queue.push([x, y]);

    }
  }
  while (queue.length > 0) {
    let currentOctopus = queue.pop();
    if (currentOctopus == undefined) {
      console.log('kut');
      break;
    }
    if (board[currentOctopus[0]][currentOctopus[1]] == 9) {
      count += 1;
      for (let d = 0; d < 8; d++) {
        let xx = currentOctopus[0] + X[d];
        let yy = currentOctopus[1] + Y[d];
        if (0 <= xx && xx < xSize && 0 <= yy && yy < ySize) {

          queue.push([xx, yy]);
        }
      }
    }
    board[currentOctopus[0]][currentOctopus[1]] += 1
  }

  return [count, board.map((nn: number[]) => nn.map((n: number) => n > 9 ? 0 : n))];
}