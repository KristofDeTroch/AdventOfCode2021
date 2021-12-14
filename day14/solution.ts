import fs from 'fs';

fs.readFile('day14/input.txt', 'utf-8', (_err: any, input: any) => {
  let data: string[] = input.split('\n').filter((s: string) => s != '');
  let result: any = {};
  for (let i = 1; i < data[0].length; i++) {
    let char = data[0].slice(i - 1, i + 1)
    if (result[char] == undefined) {
      result[char] = 1;
    } else {
      result[char] += 1;
    }
  }
  const steps = 40;
  const combinations: any = {};
  for (let i = 1; i < data.length; i++) {
    let line: string[] = data[i].split('->').map((s: string) => s.trim());

    combinations[line[0]] = [line[0][0] + line[1], line[1] + line[0][1]];

  }
  for (let _ = 0; _ < steps; _++) {
    let newResult: any = {};
    for (const element of Object.keys(result)) {
      let count: number = result[element]
      for (let i = 0; i < 2; i++) {
        let char = combinations[element][i];
        if (newResult[char] == undefined) {
          newResult[char] = count;
        } else {
          newResult[char] += count;
        }
      }
    }
    result = newResult;
  }
  let occurences: any = {};
  for (const key of Object.keys(result)) {
    let count = result[key]
    let char = key[1];
    if (occurences[char] == undefined) {
      occurences[char] = count;
    } else {
      occurences[char] += count;
    }

  }
  let counts: number[] = Object.values(occurences);
  console.log(Math.max(...counts) - Math.min(...counts))
});