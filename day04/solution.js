const fs = require('fs');

fs.readFile('day04/input.txt', 'utf-8', (err, data) => {
  	let splitData = data.split(`\n`);
  	const numbers = splitData[0].split(',').map(s => parseInt(s));
	let columnBoards = [];
	let rowBoards = [];
	let col = [[],[],[],[],[]];
	let rowBoard = new BingoRowBoard();
	for (let i = 2; i < splitData.length; i++){
		if(splitData[i] == ''){
			rowBoards.push(rowBoard);
			rowBoard = new BingoRowBoard();

			let columnBoard = new BingoColumnBoard();
			for(index in col){
				columnBoard.addColumn(col[index]);
			}
			columnBoards.push(columnBoard);
			col = [[],[],[],[],[]];
		}else{
			let row = splitData[i].split(' ').filter(d => d != '').map(s => parseInt(s));
			for (let i = 0; i < row.length; i++){
				col[i].push(row[i]);
			}
			rowBoard.addRow(splitData[i]);
		}
	}
	playBingo(numbers, columnBoards, rowBoards);
});

class BingoColumnBoard{
	constructor(){
		this.columns = [];
	}

	addColumn(rowString){
		this.columns.push(rowString);
	}

	addNumber(number){
		this.columns = this.columns.map(row => row.filter(n => n != number));
		if(this.columns.map(r => r.length).filter(r => r == 0).length > 0){			
			console.log(number)
			console.log(this.columns.map(r => r.reduce((prevVal, curValue) => prevVal+curValue, 0)).reduce((prevVal, curValue) => prevVal+curValue, 0)*number);
			return true
		}
		return false
	}
	
	printRows(){
		this.columns.map(r => console.log(r))
	}
}

class BingoRowBoard{
	constructor(){
		this.rows = [];
	}

	addRow(rowString){
		this.rows.push(rowString.split(' ').filter(d => d != '').map(s => parseInt(s)));
	}

	addNumber(number){
		this.rows = this.rows.map(row => row.filter(n => n != number));
		if(this.rows.map(r => r.length).filter(r => r == 0).length > 0){
			
			console.log(number)
			console.log(this.rows.map(r => r.reduce((prevVal, curValue) => prevVal+curValue, 0)).reduce((prevVal, curValue) => prevVal+curValue, 0)*number);
			return true
		}
		return false
	}
	
	printRows(){
		this.rows.map(r => console.log(r))
	}
}

function playBingo(numbers, rowBoards, columnBoards){
	let boardsPlayed = [];
	for (let i = 0; i < numbers.length; i++){
		for (let j = 0; j < rowBoards.length; j ++){
			if(boardsPlayed.indexOf(j) == -1){
				if(rowBoards[j].addNumber(numbers[i]) || columnBoards[j].addNumber(numbers[i])){
					boardsPlayed.push(j);
				}
			}
			
		}
	}
}