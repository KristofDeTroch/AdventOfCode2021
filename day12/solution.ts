import fs from 'fs';

fs.readFile('day12/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[][] = input.split('\n').filter((s: string) => s != '').map((s: string) => s.split('-'));
  let paths: string[][] = [];
  for (let i = 0; i < data.length; i++) {

    if (data[i][0] == 'start') {
      paths.push([data[i][0], data[i][1]])

    } else if (data[i][1] == 'start') {
      paths.push([data[i][1], data[i][0]])
    }

  }

  while (!paths.every((p: string[]) => p[p.length - 1] == 'end')) {
    let currentLength = paths.length;
    let newPaths: string[][] = [];
    for (let i = 0; i < currentLength; i++) {
      let currentPath = paths[i];
      let end = currentPath[currentPath.length - 1]
      if (end == 'end') {
        newPaths.push(currentPath);
        continue;
      }
      let connections: string[][] = data.filter((c: string[]) => (c[0] == end || c[1] == end) && !c.includes('start'));
      for (let j = 0; j < connections.length; j++) {
        const [connection] = connections[j].filter((c: string) => c != end);
        if (connection.match((/^[a-z]*$/))) {
          if (!currentPath.includes(connection)) {
            newPaths.push([...currentPath, connection]);
          }
        } else {
          newPaths.push([...currentPath, connection]);
        }
      }
    }
    paths = newPaths;
  }
  console.log(paths.length)

});

