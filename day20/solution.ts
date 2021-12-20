import fs from 'fs';
const XX = [-1, 0, 1, -1, 0, 1, -1, 0, 1];
const YY = [-1, -1, -1, 0, 0, 0, 1, 1, 1];


fs.readFile('day20/input.txt', 'utf-8', (_err: any, input: any) => {
  let data: string[][] = input.split('\n').filter((s: string) => s != '').map((s: string) => [...s]);
  const projection = data.splice(0, 1)[0];

  let first = false;
  for (let i = 0; i < 50; i++) {
    if (i == 2) {
      console.log(data.reduce((prev, curr) => prev + curr.filter((s: string) => s == '#').length, 0))
    }
    data = enhance(projection, data, first);
    first = !first

  }

  console.log(data.reduce((prev, curr) => prev + curr.filter((s: string) => s == '#').length, 0))



});

function enhance(projection: string[], image: string[][], first: boolean) {
  let enhancedImage: string[][] = [];
  const maxX = image.length
  const maxY = image[0].length
  for (let x = 0; x < maxX + 4; x++) {
    let line: string[] = [];
    for (let y = 0; y < maxY + 4; y++) {
      let string = '';
      for (let i = 0; i < 9; i++) {
        let xx = x - 2 + YY[i];
        let yy = y - 2 + XX[i];
        if (0 <= xx && xx < maxX && 0 <= yy && yy < maxY) {
          string += convert(image[xx][yy]);
        } else {
          string += first ? '1' : '0';
        }
      }
      line.push(projection[parseInt(string, 2)])
    }
    enhancedImage.push(line);
  }
  return enhancedImage;
}

function convert(s: string) {
  return s == '#' ? '1' : '0';
}