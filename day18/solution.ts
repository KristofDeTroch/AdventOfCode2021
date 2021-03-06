import fs from 'fs';

fs.readFile('day18/input.txt', 'utf-8', (_err: any, input: any) => {
  const data: string[] = input.split('\n').filter((s: string) => s != '');
  let finalSnail = new Snail(data[0]);
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    let currentSnail = new Snail(data[i]);
    if(i>0){
      finalSnail = addSnails(finalSnail,currentSnail);
    }
    for(let j = i+1; j<data.length; j++){
      let tempSnail = new Snail(data[j])
      let sum = Math.max(addSnails(tempSnail,currentSnail).getValue(),addSnails(currentSnail,tempSnail).getValue());
      if(sum> max){
        max = sum
      }
    }
    
    
    
  }
  console.log(finalSnail.getValue());
  console.log(max)


});


function addSnails(lS: Snail, rS: Snail): Snail{
  const newSnail = new Snail(`[${lS.toString()},${rS.toString()}]`)
  newSnail.reduce();
  return newSnail;
}



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
      let seperatorIndex = s.indexOf(',')
      this.left = parseInt(s.slice(1,seperatorIndex));
      length += seperatorIndex-1;
      s = s.slice(seperatorIndex+1)
    }
    if (s[0] == '[') {
      this.right = new Snail(s);
      length += this.right.getLength();
    } else {
      let seperatorIndex = s.indexOf(']')
      this.right = parseInt(s.slice(0,seperatorIndex));
      length += seperatorIndex;
    }
    this.length = length;

  }

  public reduce(){
    let reduce = true;
    while(reduce){
      if(this.reduceExplode(1)){
        continue;
      }      
      reduce = this.reduceSplit();
    }
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

  public reduceSplit():boolean{
    let left = false;
    if(typeof this.left == 'number'){
      if (this.left > 9){
        this.left = new Snail(`[${Math.floor(this.left/2)},${Math.ceil(this.left/2)}]`)
        left = true;
      }
    } else {
      left = this.left.reduceSplit();
    }
    if(left){
      return true;
    }
    let right = false;
    if(typeof this.right == 'number'){
      if (this.right > 9){
        this.right = new Snail(`[${Math.floor(this.right/2)},${Math.ceil(this.right/2)}]`)
        right = true;
      }
    } else {
      right = this.right.reduceSplit();
    }

    return right;
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

public getValue():number{
  let result = 0;
  if(typeof this.left == 'number'){
    result += 3*this.left;
  }else{
    result += 3*this.left.getValue();
  }
  if(typeof this.right == 'number'){
    result += 2*this.right;
  }else{
    result += 2*this.right.getValue();
  }


  return result;
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