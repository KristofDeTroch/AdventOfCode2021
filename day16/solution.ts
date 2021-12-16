import fs from 'fs';

fs.readFile('day16/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string = [...input].filter((s: string) => s != '\n').map((s: string) => parseInt(s, 16).toString(2).padStart(4, '0')).join('')
  let b = new BITS(data);
  console.log(b.getVersion());


});

class BITS {
  private version: number;
  private type: number;
  private value: number;
  private bits: BITS[] = [];
  private length: number;

  constructor(s: string) {
    this.version = parseInt(s.slice(0, 3), 2);
    this.type = parseInt(s.slice(3, 6), 2);
    let body = s.slice(6);
    if (this.type == 4) {
      let endOfLiteral = false;
      let value = '';
      let length = 6;
      while (!endOfLiteral) {
        if (body[0] == '0') {
          endOfLiteral = true;
        }
        value += body.slice(1, 5);
        body = body.slice(5)
        length += 5;
      }
      this.value = parseInt(value, 2);
      this.length = length;
    } else {
      let length: number;
      if (body[0] == '0') {
        length = parseInt(body.slice(1, 16), 2)
        body = body.slice(16);
        this.length = length + 6 + 16;
        let counter = 0;

        while (counter < length) {
          let bit = new BITS(body);
          this.bits.push(bit);
          counter += bit.getLength();
          body = body.slice(bit.getLength())
        }
      } else {
        length = parseInt(body.slice(1, 12), 2)
        body = body.slice(12);
        this.length = 18;
        let counter = 0;
        while (counter < length) {
          let bit = new BITS(body);
          this.bits.push(bit);
          counter += 1;
          body = body.slice(bit.getLength())
          this.length += bit.getLength();
        }
      }

      this.value = 0;
    }

  }

  public getVersion(): number {
    return this.version + this.bits.reduce((prev, curr) => prev + curr.getVersion(), 0);
  }

  public getValue() {
    return this.value;
  }

  public getLength() {
    return this.length;
  }

  public getBits() {
    return this.bits;
  }
}
