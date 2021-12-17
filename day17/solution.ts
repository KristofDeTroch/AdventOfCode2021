import fs from 'fs';

fs.readFile('day17/input.txt', 'utf-8', (_err: any, input: any) => {
  let data = input.slice(input.indexOf('=') + 1);
  let splitIndex = data.indexOf('.')
  let minX = parseInt(data.slice(0, splitIndex))
  let maxX = parseInt(data.slice(splitIndex + 2, data.indexOf(',')))

  data = data.slice(data.indexOf('=') + 1);
  splitIndex = data.indexOf('.')
  let minY = parseInt(data.slice(0, splitIndex))
  let maxY = parseInt(data.slice(splitIndex + 2, data.indexOf('\n')))

  const targetX = [minX, maxX];
  const targetY = [minY, maxY];
  let highest = 0;
  let count = 0;
  for (let x = 1; x <= maxX; x++) {
    for (let y = minY; y < 120; y++) {
      let velX = x;
      let velY = y;
      let currentHighest = 0;
      let currentXPos = 0;
      let currentYPos = 0;
      while (currentYPos >= targetY[0] && currentXPos <= targetX[1]) {
        if (currentYPos <= targetY[1] && targetX[0] <= currentXPos) {
          if (currentHighest > highest) {
            highest = currentHighest;
          }
          count += 1;
          break;
        }
        currentXPos += velX;
        currentYPos += velY;
        if (velX != 0) {
          velX -= 1
        }
        velY -= 1;
        if (currentYPos > currentHighest) {
          currentHighest = currentYPos;
        }
      }
    }
  }
  console.log(highest)
  console.log(count)

});