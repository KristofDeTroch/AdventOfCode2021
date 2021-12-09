import fs from 'fs';


fs.readFile('day06/input.txt', 'utf-8', (_err: any, data: any) => {
  const school: any = {
    fish0: 0,
    fish1: 0,
    fish2: 0,
    fish3: 0,
    fish4: 0,
    fish5: 0,
    fish6: 0,
    fish7: 0,
    fish8: 0,
  }
  let input: number[] = data.split(',').map((s: string) => parseInt(s));
  for (let i: number = 0; i < 6; i++) {
    school['fish' + i.toString()] = input.filter((n: number) => n == i).length;
  }
  let fish0: number;
  for (let i: number = 0; i < 256; i++) {
    fish0 = school['fish0'];
    for (let j: number = 0; j < 9; j++) {
      if (j == 8) {
        school['fish' + j.toString()] = fish0;
      } else if (j == 6) {
        school['fish' + j.toString()] = fish0 + school['fish' + (j + 1).toString()];
      } else {
        school['fish' + j.toString()] = school['fish' + (j + 1).toString()];
      }
    }
  }
  console.log(school)
  console.log(Object.keys(school).map((key: string) => school[key]).reduce((prev: number, curr: number) => prev + curr, 0))
});