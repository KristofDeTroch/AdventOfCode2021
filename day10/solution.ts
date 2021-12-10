import fs from 'fs';

const openC = [..."([{<"]
const closeC = [...")]}>"]
const part1Scores: any = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}
const part2Scores: any = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4
}

fs.readFile('day10/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n');
  let score1 = 0;
  let score2: number[] = [];
  for (let i = 0; i < data.length; i++) {
    let line = [...data[i]];
    let nextChar: string = '';
    while (line.length > 0) {
      let corrupt = false;
      let end = true;
      for (let j = 0; j < line.length - 1; j++) {
        let currentChar: number = openC.indexOf(line[j]);
        nextChar = line[j + 1];
        if (closeC.indexOf(nextChar) != -1) {
          if (currentChar == closeC.indexOf(nextChar)) {
            line.splice(j, 2);
            end = false
            break;
          } else {
            corrupt = true;
            break;
          }
        }
      }
      if (corrupt) {

        score1 += part1Scores[nextChar]
        break;
      }
      if (end) {
        let s = 0;
        for (let i = line.length - 1; i >= 0; i--) {
          s *= 5;
          s += part2Scores[line[i]]
        }
        score2.push(s);
        break;
      }
    }

  }
  console.log(score1)

  score2.sort((a: number, b: number) => a - b);
  console.log(score2[(score2.length - 1) / 2])
});

