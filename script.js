const gameBoard = (() => {
	var message = document.getElementById('message');
	var XButton = document.getElementById('XButton');
	var OButton = document.getElementById('OButton');
	var startComp = document.getElementById('startComp');
	var restart = document.getElementById('restart');
	var choice = document.getElementById('choice');
	var popUp = document.getElementById('popUp');
	var buttonBottom = document.getElementById('buttonBottom');

	const startCompEvent = () => {
		choice.style.display = 'block';
		OButton.style.color = '#f5f5f5';
		XButton.style.color = '#f5f5f5';
	};

	const Xevent = () => {
		XButton.style.color = '#ff5858';
		OButton.style.color = 'black';
		gameFlow.setTurn('playerXturn');

		OButton.removeEventListener('click', Oevent);
	};

	const Oevent = () => {
		OButton.style.color = '#ff5858';
		XButton.style.color = 'black';
		gameFlow.computerTurn('X');

		XButton.removeEventListener('click', Xevent);
	};

	const restartEvent = () => {
		OButton.style.color = '#f5f5f5';
		XButton.style.color = 'black';
		message.textContent = '';
		choice.style.display = 'none';
		gameBoard.popUp.style.display = 'none';

		gameFlow.reset();
		gameFlow.displayGame();
		startComp.addEventListener('click', startCompEvent);
		XButton.addEventListener('click', Xevent);
		OButton.addEventListener('click', Oevent);
	}

	startComp.addEventListener('click', startCompEvent);
	XButton.addEventListener('click', Xevent);
	OButton.addEventListener('click', Oevent);
	restart.addEventListener('click', restartEvent);
	buttonBottom.addEventListener('click', restartEvent);

	return {
		startComp,
		startCompEvent,
		XButton,
		Xevent,
		OButton,
		Oevent,
		message,
		restart,
		choice,
		popUp,
		buttonBottom,
		restartEvent
	};
})();


const gameFlow = (() => {
	let allMoves = ['', '', '', '', '', '', '', '', ''];
	let cells = document.getElementsByClassName('cell');
	let playerXmoves = [];
	let playerOmoves = [];
	let turn = '';
	let AI = 'alive';
	let gameOver = false;
	const setTurn = (a) => {
		turn = a;
	};
	const setAI = (a) => {
		AI = a;
	};

	//Click response
	var makeMove = (n) => {
		if (allMoves[n - 1] === '' && turn === 'playerXturn') {
			allMoves.splice(n - 1, 1, 'X');
			playerXmoves.push(n);
			turn = 'playerOturn';
			displayGame();
			checkScore(playerXmoves, 'X');
			computerTurn('O');
		} else if (allMoves[n - 1] === '' && turn === 'playerOturn') {
			allMoves.splice(n - 1, 1, 'O');
			playerOmoves.push(n);
			turn = 'playerXturn';
			displayGame();
			checkScore(playerOmoves, 'O');
			computerTurn('X');
		}
		return n;
	};

	const computerTurn = (mark) => {
		if (AI === 'alive') {
			//get all played cells
			var allPlayedNumbers = playerXmoves.concat(playerOmoves);
			//computer choice
			let compCellChoice = computerPlay(allPlayedNumbers) - 1;
			allMoves.splice(compCellChoice, 1, mark);
			if (mark === 'X') {
				playerXmoves.push(compCellChoice + 1);
				checkScore(playerXmoves, 'X');
				if (gameOver === false) {
					setTurn('playerOturn');
				}
			} else if (mark === 'O') {
				playerOmoves.push(compCellChoice + 1);
				checkScore(playerOmoves, 'O');
				if (gameOver === false) {
					setTurn('playerXturn');
				}
			}

			displayGame();
		}
	};

	const computerPlay = (myArray) => {
		var allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		//exclude all played cells
		allCells = allCells.filter(function (e) {
			return this.indexOf(e) < 0;
		}, myArray);

		return allCells[Math.floor(Math.random() * allCells.length)];
	};

	const checkScore = (moves, player) => {
		//check all winning patterns
		if (moves.indexOf(1) !== -1 && moves.indexOf(2) !== -1 && moves.indexOf(3) !== -1) {
			cells[0].style.backgroundColor = '#ff8282';
			cells[1].style.backgroundColor = '#ff8282';
			cells[2].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			cells[3].style.backgroundColor = '#ff8282';
			cells[4].style.backgroundColor = '#ff8282';
			cells[5].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(7) !== -1 && moves.indexOf(8) !== -1 && moves.indexOf(9) !== -1) {
			cells[6].style.backgroundColor = '#ff8282';
			cells[7].style.backgroundColor = '#ff8282';
			cells[8].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(4) !== -1 && moves.indexOf(7) !== -1) {
			cells[0].style.backgroundColor = '#ff8282';
			cells[3].style.backgroundColor = '#ff8282';
			cells[6].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(2) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(8) !== -1) {
			cells[1].style.backgroundColor = '#ff8282';
			cells[4].style.backgroundColor = '#ff8282';
			cells[7].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(6) !== -1 && moves.indexOf(9) !== -1) {
			cells[2].style.backgroundColor = '#ff8282';
			cells[5].style.backgroundColor = '#ff8282';
			cells[8].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(4) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(6) !== -1) {
			cells[3].style.backgroundColor = '#ff8282';
			cells[4].style.backgroundColor = '#ff8282';
			cells[5].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(1) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(9) !== -1) {
			cells[0].style.backgroundColor = '#ff8282';
			cells[4].style.backgroundColor = '#ff8282';
			cells[8].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();
		} else if (moves.indexOf(3) !== -1 && moves.indexOf(5) !== -1 && moves.indexOf(7) !== -1) {
			cells[2].style.backgroundColor = '#ff8282';
			cells[4].style.backgroundColor = '#ff8282';
			cells[6].style.backgroundColor = '#ff8282';
			gameBoard.message.textContent = player + ' winner';
			gameFinished();

			//Tie
		} else if (moves.length === 5) {
			gameBoard.message.textContent = ' Tie';
			gameFinished();
		}

	};

	const gameFinished = () => {
		turn = '';
		AI = 'dead';
		gameOver = true;

		gameBoard.popUp.style.display = 'block';
	};

	const reset = () => {
		allMoves = ['', '', '', '', '', '', '', '', ''];
		playerXmoves = [];
		playerOmoves = [];
		AI = 'alive';
		turn = '';
		gameOver = false;
		for (i = 0; i < cells.length; i++) {
			cells[i].style.backgroundImage = 'none';
			cells[i].style.backgroundColor = 'transparent';
		}
	};

	const displayGame = () => {
		for (i = 0; i < cells.length; i++) {
			if (allMoves[i] === 'O') {
				cells[i].style.backgroundImage = 'url(images/O.png)';
				cells[i].style.backgroundSize = 'cover';
				cells[i].style.backgroundPosition = 'center';
			}
			if (allMoves[i] === 'X') {
				cells[i].style.backgroundImage = 'url(images/X.png)';
				cells[i].style.backgroundSize = 'cover';
				cells[i].style.backgroundPosition = 'center';
			}
		}
	};

	return {
		setAI,
		allMoves,
		playerXmoves,
		playerOmoves,
		computerTurn,
		computerPlay,
		makeMove,
		setTurn,
		turn,
		checkScore,
		reset,
		displayGame,
		AI,
		gameOver,
		gameFinished
	};
})();
