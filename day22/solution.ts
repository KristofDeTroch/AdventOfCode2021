import fs from 'fs';

fs.readFile('day22/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n').filter((s: string) => s != '');
  solvePart1(data)
  solvePart2(data)
});

class Cube {
  private minX: number;
  private maxX: number;
  private minY: number;
  private maxY: number;
  private minZ: number;
  private maxZ: number;

  constructor(range: number[][]) {
    this.minX = range[0][0]
    this.maxX = range[0][1]
    this.minY = range[1][0]
    this.maxY = range[1][1]
    this.minZ = range[2][0]
    this.maxZ = range[2][1]
  }

  public getSize() {
    return (Math.abs(this.maxX - this.minX) + 1) * (Math.abs(this.maxY - this.minY) + 1) * (Math.abs(this.maxZ - this.minZ) + 1)
  }

  public split(cube: Cube) {
    if (isIntersecting(this, cube) || isIntersecting(cube, this)) {
      let result: Cube[] = []
      if (this.getMinX() < cube.getMinX()) {
        result.push(new Cube([[this.getMinX(), cube.getMinX() - 1], [this.getMinY(), this.getMaxY()], [this.getMinZ(), this.getMaxZ()]]))
      }
      if (this.getMaxX() > cube.getMaxX()) {
        result.push(new Cube([[cube.getMaxX() + 1, this.getMaxX()], [this.getMinY(), this.getMaxY()], [this.getMinZ(), this.getMaxZ()]]))
      }
      result.push(...(new Cube([[Math.max(cube.getMinX(), this.getMinX()), Math.min(cube.getMaxX(), this.getMaxX())], [this.getMinY(), this.getMaxY()], [this.getMinZ(), this.getMaxZ()]])).splitY(cube))
      return result;
    } else { return [this] }
  }

  private splitY(cube: Cube): Cube[] {
    if (isIntersecting(this, cube) || isIntersecting(cube, this)) {

      let result: Cube[] = []
      if (this.getMinY() < cube.getMinY()) {
        result.push(new Cube([[this.getMinX(), this.getMaxX()], [this.getMinY(), cube.getMinY() - 1], [this.getMinZ(), this.getMaxZ()]]))
      }
      if (this.getMaxY() > cube.getMaxY()) {

        result.push(new Cube([[this.getMinX(), this.getMaxX()], [cube.getMaxY() + 1, this.getMaxY()], [this.getMinZ(), this.getMaxZ()]]))
      }
      result.push(...(new Cube([[this.getMinX(), this.getMaxX()], [Math.max(cube.getMinY(), this.getMinY()), Math.min(cube.getMaxY(), this.getMaxY())], [this.getMinZ(), this.getMaxZ()]])).splitZ(cube))
      return result;
    } else {
      return [this]
    }
  }

  private splitZ(cube: Cube): Cube[] {
    if (isIntersecting(this, cube) || isIntersecting(cube, this)) {

      let result: Cube[] = []
      if (this.getMinZ() < cube.getMinZ()) {
        result.push(new Cube([[this.getMinX(), this.getMaxX()], [this.getMinY(), this.getMaxY()], [this.getMinZ(), cube.getMinZ() - 1]]))
      }
      if (this.getMaxZ() > cube.getMaxZ()) {
        result.push(new Cube([[this.getMinX(), this.getMaxX()], [this.getMinY(), this.getMaxY()], [cube.getMaxZ() + 1, this.getMaxZ()]]))
      }

      return result;
    } else {
      return [this]
    }
  }

  public getMinX() {
    return this.minX
  }

  public getMaxX() {
    return this.maxX
  }

  public getMinY() {
    return this.minY
  }

  public getMaxY() {
    return this.maxY
  }

  public getMinZ() {
    return this.minZ
  }

  public getMaxZ() {
    return this.maxZ
  }

}

function solvePart1(data: string[]) {
  const reactorSize = 101
  const min = 50;
  let cubes = newCube(reactorSize);
  for (let line of data) {
    let input = getRange(line, min);
    let value = line.startsWith('on') ? 1 : 0;
    for (let x = Math.max(input[0][0], 0); x <= Math.min(input[0][1], 100); x++) {
      for (let y = Math.max(input[1][0], 0); y <= Math.min(input[1][1], 100); y++) {
        for (let z = Math.max(input[2][0], 0); z <= Math.min(input[2][1], 100); z++) {
          cubes[x][y][z] = value;
        }
      }
    }

  }
  console.log(cubes.reduce((prev, curr) => prev + curr.reduce((pre, cur) => pre + cur.filter((n: number) => n == 1).length, 0), 0))

}

function solvePart2(data: string[]) {
  let cubeInstances: Cube[] = [];
  for (let line of data) {

    let newCubes: Cube[] = []
    let newCube = new Cube(getRange(line, 0));
    for (let cube of cubeInstances) {
      newCubes.push(...cube.split(newCube))
    }

    if (line.startsWith('on')) {
      newCubes.push(newCube);
    }
    cubeInstances = newCubes
  }
  console.log(cubeInstances.reduce((prev, curr) => prev + curr.getSize(), 0))
}

// off x=-123..456,y=-789..123,z=-456..789 => [[-123,456],[-789,123],[-456,789]]
function getRange(line: string, minX: number): number[][] {
  let result: number[][] = []
  for (let _ = 0; _ < 3; _++) {
    let startIndex = line.indexOf('=') + 1;
    let endIndex = line.indexOf('.');
    let min = parseInt(line.slice(startIndex, endIndex)) + minX;
    startIndex = endIndex + 2;
    endIndex = line.indexOf(',');
    let max = parseInt(_ == 2 ? line.slice(startIndex) : line.slice(startIndex, endIndex)) + minX;
    result.push([min, max])
    line = line.slice(endIndex + 1);
  }

  return result;
}

// create a 3D array of a given size;
function newCube(reactorSize: number) {
  return Array.apply(null, Array(reactorSize)).map(function () { return Array.apply(null, Array(reactorSize)).map(function () { return Array.apply(null, Array(reactorSize)).map(function () { return 0; }); }); })
}

function isIntersecting(c1: Cube, c2: Cube) {
  return ((c1.getMaxX() >= c2.getMinX() && c2.getMaxX() >= c1.getMinX()) && (c1.getMaxY() >= c2.getMinY() && c2.getMaxY() >= c1.getMinY()) && (c1.getMaxZ() >= c2.getMinZ() && c2.getMaxZ() >= c1.getMinZ()))

}