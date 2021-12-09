import fs from 'fs';

fs.readFile('day08/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n')
  let answer: number[] = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i] != "") {
      const line: string[] = data[i].split("|")[0].split(" ");
      let one = line.filter((s: string) => s.length == 2)[0].split('');
      let seven = line.filter((s: string) => s.length == 3)[0].split('');
      let four = line.filter((s: string) => s.length == 4)[0].split('');
      let eight = line.filter((s: string) => s.length == 7)[0].split('');
      let zero = line.filter((s: string) => isZero(s, one, four))[0].split('');
      let six = line.filter((s: string) => isSix(s, one))[0].split('');
      let five = line.filter((s: string) => isFive(s, six))[0].split('');
      let nine = line.filter((s: string) => isNine(s, six, zero))[0].split('');
      let three = line.filter((s: string) => isThree(s, nine, five))[0].split('')
      let two = line.filter((s: string) => isTwo(s, three, five))[0].split('');
      const solution = [zero, one, two, three, four, five, six, seven, eight, nine];
      const digitStrings = data[i].split("| ")[1].split(" ").map((s: string) => [...s]);
      const digits: number[] = digitStrings.map((s: string[]) => solution.findIndex((digit: string[]) => s.length == digit.length && s.filter((c: string) => digit.includes(c)).length == digit.length))
      answer.push(digits.reduce((prev: number, value: number, index: number) => prev + value * Math.pow(10, 3 - index), 0))
    }
  }
  console.log(answer.reduce((prev: number, curr: number) => prev + curr, 0))
});

function isZero(zero: string, one: string[], four: string[]): boolean {
  let uniqueFour = four.filter((s: string) => !one.includes(s))
  return zero.length == 6 && zero.includes(one[0]) && zero.includes(one[1]) && uniqueFour.filter((s: string) => zero.includes(s)).length == 1;
}

function isSix(six: string, one: string[]): boolean {
  return six.length == 6 && (!six.includes(one[0]) || !six.includes(one[1]))
}

function isFive(five: string, six: string[]): boolean {
  return five.length == 5 && six.filter((s: string) => five.includes(s)).length == 5;
}

function isNine(nine: string, six: string[], zero: string[]): boolean {
  return nine.length == 6 && six.filter((s: string) => nine.includes(s)).length != 6 && zero.filter((s: string) => nine.includes(s)).length != 6;
}

function isThree(three: string, nine: string[], five: string[]): boolean {
  return three.length == 5 && nine.filter((s: string) => three.includes(s)).length == 5 && five.filter((s: string) => three.includes(s)).length != 5;
}
function isTwo(two: string, three: string[], five: string[]): boolean {
  return two.length == 5 && three.filter((s: string) => two.includes(s)).length != 5 && five.filter((s: string) => two.includes(s)).length != 5;
}