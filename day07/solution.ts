import fs from 'fs';


fs.readFile('day07/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: number[] = input.split(',').map((string: string) => parseInt(string))
  let allFuel = [];
  for (let i = 0; i < Math.max(...data); i++) {
    let fuel = 0
    for (let j = 0; j < data.length; j++) {
      fuel += getFuel(Math.abs(i - data[j]));
    }
    allFuel.push(fuel);
  }

  console.log(Math.min(...allFuel))
});

function getFuel(distance: number): number {
  if (distance == 0) {
    return 0;
  }
  return distance + getFuel(distance - 1);
}