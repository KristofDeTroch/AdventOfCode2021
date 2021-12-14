import fs from 'fs';

fs.readFile('day14/input.txt', 'utf-8', (_err: any, input: any) => {
  let data: string[] = input.split('\n').filter((s: string) => s != '');
  let result = data[0];
  const steps = 10;
  const combinations: any = {};
  for (let i = 1; i < data.length; i++) {
    let line: string[] = data[i].split('->').map((s: string) => s.trim());

    combinations[line[0]] = line[1] + line[0][1];

  }

  for (let _ = 0; _ < steps; _++) {
    let newResult: string = result[0];
    for (let i = 0; i < result.length - 1; i++) {
      const element = result.slice(i, i + 2);
      newResult += combinations[element];
    }
    result = newResult;
  }

  let minCount = 1e9;
  let maxCount = 0;
  let characters = new Set([...result]);

  for (const char of characters) {
    let count = [...result].filter((s: string) => s == char).length;
    if (count > maxCount) {
      maxCount = count;
    }
    if (count < minCount) {
      minCount = count;
    }

  }
  console.log(maxCount - minCount)
});