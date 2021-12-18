import fs from 'fs';

fs.readFile('day18/test.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n').filter((s: string) => s != '');
  for (let i = 0; i < data.length; i++) {
    console.log('(--------------------------------------------------)')
    console.log(data[i])
    const snail = new Snail(data[i]);
    snail.reduceExplode(1)
    console.log(snail.toString())

  }


});

class Snail {

  private length: number;
  private left: number | Snail;
  private right: number | Snail;

  constructor(input: string) {
    let s = input;
    let length = 3;
    if (s[1] == '[') {
      this.left = new Snail(s.slice(1));
      length += this.left.getLength();
      s = s.slice(this.left.getLength() + 2);
    } else {
      this.left = parseInt(s[1]);
      length += 1;
      s = s.slice(3)
    }
    if (s[0] == '[') {
      this.right = new Snail(s);
      length += this.right.getLength();
    } else {
      this.right = parseInt(s[0]);
      length += 1;
    }
    this.length = length;

  }

  public reduceExplode(level: number): explosion {
    if (level == 5) {
      if (typeof this.left != 'number' || typeof this.right != 'number') {
        throw Error;
      }
      return { left: this.left, center: true, right: this.right }
    }
    if (typeof this.left != 'number') {
      let explosion = this.left.reduceExplode(level + 1);
      if (explosion) {
        if (explosion.center) {
          this.left = 0;
          explosion.center = false;
        }
        if (explosion.right) {
          if (typeof this.right == 'number') {
            this.right += explosion.right;
          } else {
            this.right.addLeft(explosion.right)
          }
          explosion.right = false;
        }
        return explosion;
      }
    }
    if (typeof this.right != 'number') {
      let explosion = this.right.reduceExplode(level + 1);
      if (explosion) {
        if (explosion.center) {
          this.right = 0;
          explosion.center = false;
        }
        if (explosion.left) {
          if (typeof this.left == 'number') {
            this.left += explosion.left;
          } else {
            this.left.addRight(explosion.left)
          }
          explosion.left = false;
        }
        return explosion;
      }

    }
    return false;
  }

  public addRight(value: number) {
    if (typeof this.right == 'number') {
      this.right += value;
    } else {
      this.right.addRight(value);
    }
  }

  public addLeft(value: number) {
    if (typeof this.left == 'number') {
      this.left += value;
    } else {
      this.left.addLeft(value);
    }
  }

  public getLength() {
    return this.length
  }

  public toString(): string {
    return `[${this.left.toString()},${this.right.toString()}]`;

  }
}

type explosion = false |
{ left: false | number, center: boolean, right: false | number }