

const A = [
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1],
]

class Player {
  private score: number;
  private position: number;
  constructor(position: number) {
    this.score = 0;
    this.position = position;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public getScore(): number {
    return this.score;
  }

  public setPosition(position: number) {
    this.position = position;
  }

  public getPosition(): number {
    return this.position;
  }

  public move(places: number) {
    let newPosition = this.position + places;
    while (newPosition > 10) {
      newPosition -= 10;
    }
    this.position = newPosition;
    this.score += newPosition;
  }

}

class Dice {

  private currentEye: number;
  private rolls: number
  constructor() {
    this.currentEye = 1;
    this.rolls = 0;
  }

  public roll(): number {
    let roll = 0;
    for (let i = 0; i < 3; i++) {
      this.rolls += 1;
      roll += this.currentEye;
      this.currentEye += 1;
      if (this.currentEye > 100) {
        this.currentEye -= 100;
      }
    }
    return roll;
  }

  public getRolls(): number {
    return this.rolls;
  }
}


function simulateUniversum(player1: Player, player2: Player, counter: number): [number, number] {

  if (player1.getScore() >= 21) {
    return [1, 0];
  }
  if (player2.getScore() >= 21) {
    return [0, 1];
  }
  const p1Score = player1.getScore();
  const p2Score = player2.getScore();
  const p1Position = player1.getPosition();
  const p2Position = player2.getPosition();
  let score1 = 0;
  let score2 = 0;
  for (let i = 0; i < 7; i++) {
    let roll = A[i];
    player1.setScore(p1Score);
    player2.setScore(p2Score);
    player1.setPosition(p1Position);
    player2.setPosition(p2Position);
    if (counter % 2 == 0) {
      player1.move(roll[0])
    } else {
      player2.move(roll[0])
    }
    let scores = simulateUniversum(player1, player2, counter + 1);
    score1 += roll[1] * scores[0];
    score2 += roll[1] * scores[1];
  }

  return [score1, score2];
}


const startPositions: [number, number] = [1, 2];
playSimpleGame(startPositions)
playQuantumGame(startPositions)

function playSimpleGame([startPos1, startPos2]: [number, number]) {
  const players = [new Player(startPos1), new Player(startPos2)]
  const dice = new Dice();
  let counter = 0

  while (players.map((p: Player) => p.getScore()).every((score: number) => score < 1000)) {
    let roll = dice.roll();
    players[counter % 2].move(roll);
    counter += 1;
  }
  console.log(players[counter % 2].getScore() * dice.getRolls())

}


function playQuantumGame([startPos1, startPos2]: [number, number]) {
  let player1 = new Player(startPos1)
  let player2 = new Player(startPos2)

  const players = simulateUniversum(player1, player2, 0);
  console.log(players)
}
