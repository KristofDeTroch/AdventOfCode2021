import fs from 'fs';


fs.readFile('day05/input.txt', 'utf-8', (_err: any, data: any) => {
	let lines: any = {};
	let lineData: any = data.split('\n').filter((s: string) => s.includes('->')).map((s: string) => {
		let c1 = s.split('->')[0].split(",").map((s: string) => parseInt(s));
		let c2 = s.split('->')[1].split(",").map((s: string) => parseInt(s));
		return { from: c1, to: c2 };
	});
	let straightLineData: any = lineData.filter((currentLine: { from: number[], to: number[] }) => currentLine.from[0] == currentLine.to[0] || currentLine.from[1] == currentLine.to[1]).map((c: { from: number[], to: number[] }) => ({ from: [Math.min(c.from[0], c.to[0]), Math.min(c.from[1], c.to[1])], to: [Math.max(c.from[0], c.to[0]), Math.max(c.from[1], c.to[1])] }));
	let diagonalLineData: any = lineData.filter((currentLine: { from: number[], to: number[] }) => !(currentLine.from[0] == currentLine.to[0] || currentLine.from[1] == currentLine.to[1]));



	for (let i = 0; i < straightLineData.length; i++) {
		let currentLine: any = straightLineData[i];
		for (let x = currentLine.from[0]; x <= currentLine.to[0]; x++) {
			for (let y = currentLine.from[1]; y <= currentLine.to[1]; y++) {
				if (lines['x' + x.toString()] == undefined) {
					lines['x' + x.toString()] = {};
				}
				if (lines['x' + x.toString()]['y' + y.toString()] == undefined) {
					lines['x' + x.toString()]['y' + y.toString()] = 1;
				} else {
					lines['x' + x.toString()]['y' + y.toString()] += 1;

				}
			}
		}
	}
	for (let i = 0; i < diagonalLineData.length; i++) {
		let currentLine: any = diagonalLineData[i];
		if (currentLine.from[0] > currentLine.to[0]) {
			if (currentLine.from[1] > currentLine.to[1]) {
				for (let x = currentLine.from[0], y = currentLine.from[1]; x >= currentLine.to[0] && y >= currentLine.to[1]; x--, y--) {
					if (lines['x' + x.toString()] == undefined) {
						lines['x' + x.toString()] = {};
					}
					if (lines['x' + x.toString()]['y' + y.toString()] == undefined) {
						lines['x' + x.toString()]['y' + y.toString()] = 1;
					} else {
						lines['x' + x.toString()]['y' + y.toString()] += 1;

					}
				}
			} else {
				for (let x = currentLine.from[0], y = currentLine.from[1]; x >= currentLine.to[0] && y <= currentLine.to[1]; x--, y++) {
					if (lines['x' + x.toString()] == undefined) {
						lines['x' + x.toString()] = {};
					}
					if (lines['x' + x.toString()]['y' + y.toString()] == undefined) {
						lines['x' + x.toString()]['y' + y.toString()] = 1;
					} else {
						lines['x' + x.toString()]['y' + y.toString()] += 1;

					}
				}
			}
		} else {
			if (currentLine.from[1] > currentLine.to[1]) {
				for (let x = currentLine.from[0], y = currentLine.from[1]; x <= currentLine.to[0] && y >= currentLine.to[1]; x++, y--) {
					if (lines['x' + x.toString()] == undefined) {
						lines['x' + x.toString()] = {};
					}
					if (lines['x' + x.toString()]['y' + y.toString()] == undefined) {
						lines['x' + x.toString()]['y' + y.toString()] = 1;
					} else {
						lines['x' + x.toString()]['y' + y.toString()] += 1;

					}
				}
			} else {
				for (let x = currentLine.from[0], y = currentLine.from[1]; x <= currentLine.to[0] && y <= currentLine.to[1]; x++, y++) {
					if (lines['x' + x.toString()] == undefined) {
						lines['x' + x.toString()] = {};
					}
					if (lines['x' + x.toString()]['y' + y.toString()] == undefined) {
						lines['x' + x.toString()]['y' + y.toString()] = 1;
					} else {
						lines['x' + x.toString()]['y' + y.toString()] += 1;

					}
				}
			}
		}
	}
	let count: number = 0;
	Object.keys(lines).forEach(lKey => Object.keys(lines[lKey]).forEach(cKey => count += lines[lKey][cKey] > 1 ? 1 : 0));
	console.log(count);
});

function lPrint(lines: any) {
	console.log(lines)
	for (let y = 0; y < 10; y++) {
		let string = "";
		for (let x = 0; x < 10; x++) {
			if (lines['x' + x.toString()] == undefined || lines['x' + x.toString()]['y' + y.toString()] == undefined) {
				string += '.';
			} else {
				string += lines['x' + x.toString()]['y' + y.toString()];

			}
		}
		console.log(string);
	}
}