import fs from 'fs';

const openC = [..."([{<"]
const closeC = [...")]}>"]

fs.readFile('day10/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n');
  let score = 0;
  for (let i = 0; i < data.length; i++) {
    let line = [...data[i]];
    let nextChar: number = -1;
    while (line.length > 0) {
      let corrupt = false;
      let end = true;
      for (let j = 0; j < line.length - 1; j++) {
        let currentChar: number = openC.indexOf(line[j]);
        nextChar = closeC.indexOf(line[j + 1]);
        if (nextChar != -1) {
          if (currentChar == nextChar) {
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

        switch (nextChar) {
          case 0:
            score += 3;
            break;
          case 1:
            score += 57;
            break;
          case 2:
            score += 1197;
            break;
          case 3:
            score += 25137;
            break;
          default:
            console.log("ERROR:");
            console.log(data[i])
            console.log(line.join(''))

        }
        break;
      }
      if (end) { break; }
    }

  }
  console.log(score)
});