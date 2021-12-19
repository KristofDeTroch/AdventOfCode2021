import fs from 'fs';

type Scanner = Beacon[];
type Beacon = [number, number, number]
type Rotation = [[number, number, number], [number, number, number], [number, number, number]]


fs.readFile('day19/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n').filter((r: string) => r != '')
  let scanners: Scanner[] = []
  let beacons: Beacon[] = []
  for (let i = 1; i < data.length; i++) {
    let line = data[i];
    if (line.includes('---')) {
      scanners.push(beacons)
      beacons = [];
    } else {
      let x = parseInt(line.slice(0, line.indexOf(',')));
      line = line.slice(line.indexOf(',') + 1)
      let y = parseInt(line.slice(0, line.indexOf(',')));
      line = line.slice(line.indexOf(',') + 1)
      let z = parseInt(line);
      beacons.push([x, y, z])
    }
  }

  scanners.push(beacons)
  let seenScanners: number[] = [0]
  let finalBeacons = scanners[0];
  let scannerPositions = [[0, 0, 0]]

  while (scanners.length > seenScanners.length) {
    for (let i = 0; i < scanners.length; i++) {
      if (!seenScanners.includes(i)) {
        for (let j = 0; j < scanners.length; j++) {
          if (seenScanners.includes(j)) {
            let duplicateBeacons = getSameBeacons(scanners[i], scanners[j]);
            if (duplicateBeacons.length > 11) {
              let settings = getSettings(duplicateBeacons);
              scannerPositions.push([settings[3], settings[4], settings[5]])
              scanners[i] = scanners[i].map((b: Beacon) => rotate(rotate(rotate(b, XX[settings[0]]), YY[settings[1]]), ZZ[settings[2]]))
                .map((b: Beacon) => [b[0] + settings[3], b[1] + settings[4], b[2] + settings[5]])
              seenScanners.push(i)
              finalBeacons = finalBeacons.concat(scanners[i].filter((b1: Beacon) => !finalBeacons.some((b2: Beacon) => b1[0] == b2[0] && b1[1] == b2[1] && b1[2] == b2[2])));
              break;
            }
          }
        }
      }
    }
  }
  console.log(finalBeacons.length)
  let max = 0;
  for (let i = 0; i < scannerPositions.length; i++) {
    for (let j = 0; j < scannerPositions.length; j++) {
      let distance = Math.abs(scannerPositions[i][0] - scannerPositions[j][0]) + Math.abs(scannerPositions[i][1] - scannerPositions[j][1]) + Math.abs(scannerPositions[i][2] - scannerPositions[j][2])
      if (distance > max) {
        max = distance;
      }
    }
  }
  console.log(max)

});

const XX: Rotation[] = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [1, 0, 0],
    [0, 0, -1],
    [0, 1, 0]
  ],
  [
    [1, 0, 0],
    [0, -1, 0],
    [0, 0, -1]
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [0, -1, 0]
  ]
]

const YY: Rotation[] = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [0, 0, 1],
    [0, 1, 0],
    [-1, 0, 0]
  ],
  [
    [-1, 0, 0],
    [0, 1, 0],
    [0, 0, -1]
  ],
  [
    [0, 0, -1],
    [0, 1, 0],
    [1, 0, 0]
  ]
]

const ZZ: Rotation[] = [
  [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ],
  [
    [0, -1, 0],
    [1, 0, 0],
    [0, 0, 1]
  ],
  [
    [-1, 0, 0],
    [0, -1, 0],
    [0, 0, 1]
  ],
  [
    [0, 1, 0],
    [-1, 0, 0],
    [0, 0, 1]
  ]
]

function getSettings(beacons: [Beacon, Beacon][]): [number, number, number, number, number, number] {
  for (let x = 0; x < 4; x++) {
    for (let y = 0; y < 4; y++) {
      for (let z = 0; z < 4; z++) {
        let correct = true;
        let difference: Beacon = [0, 0, 0];
        for (let i = 0; i < beacons.length; i++) {
          let rotatedBeacon = rotate(rotate(rotate(beacons[i][0], XX[x]), YY[y]), ZZ[z])
          if (i == 0) {
            difference = [rotatedBeacon[0] - beacons[i][1][0], rotatedBeacon[1] - beacons[i][1][1], rotatedBeacon[2] - beacons[i][1][2]]
          } else if (rotatedBeacon.some((value: number, index: number) => value - beacons[i][1][index] != difference[index])) {
            correct = false;
            break;
          }
        }
        if (correct) {
          return [x, y, z, -difference[0], -difference[1], -difference[2]];
        }
      }
    }
  }
  console.log('Fail')
  throw Error;

}

function getSameBeacons(leftScanner: Scanner, rightScanner: Scanner): [Beacon, Beacon][] {
  let leftDistances: [number[], Beacon][] = []
  for (let i = 0; i < leftScanner.length; i++) {
    let distance: number[] = []
    for (let j = 0; j < leftScanner.length; j++) {
      if (i != j) {
        distance.push(getDistance(leftScanner[j], leftScanner[i]));
      }
    }
    leftDistances.push([distance, leftScanner[i]]);
  }

  let sameBeacons: [Beacon, Beacon][] = []

  for (let i = 0; i < rightScanner.length; i++) {
    let distance: number[] = []
    for (let j = 0; j < rightScanner.length; j++) {
      if (i != j) {
        distance.push(getDistance(rightScanner[i], rightScanner[j]));
      }
    }
    let leftBeacon = leftDistances.find((dList: [number[], Beacon]) => distance.filter((d: number) => dList[0].includes(d)).length >= 11);
    if (leftBeacon) {
      sameBeacons.push([leftBeacon[1], rightScanner[i]])
    }
  }

  return sameBeacons;
}

function getDistance(lB: Beacon, rB: Beacon): number {
  return Math.round(Math.sqrt(Math.pow(lB[0] - rB[0], 2) + Math.pow(lB[1] - rB[1], 2) + Math.pow(lB[2] - rB[2], 2)))
}

function rotate(beacon: Beacon, rotation: Rotation): Beacon {
  let x = beacon[0] * rotation[0][0] + beacon[1] * rotation[0][1] + beacon[2] * rotation[0][2];
  let y = beacon[0] * rotation[1][0] + beacon[1] * rotation[1][1] + beacon[2] * rotation[1][2];
  let z = beacon[0] * rotation[2][0] + beacon[1] * rotation[2][1] + beacon[2] * rotation[2][2];
  return [x, y, z]
}