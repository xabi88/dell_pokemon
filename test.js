var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayBoard (board) {

  console.log(`
    
    ${board.A1} | ${board.B1} | ${board.C1}\n
    ___|____|___\n
       |    |   \n
    ${board.A2} | ${board.B2} | ${board.C2}\n
    ___|____|___\n
       |    |   \n
    ${board.A3} | ${board.B3} | ${board.C3}
    
  `);
}

function togglePlayer(player) {

  if (player === '1') {
    return '2';
  }
  return '1';
}

function getPrompt(player, symbol, vsAI) {

  if (vsAI) {
    if (player === '2') {
      return 'Computer\'s turn!';
    }
  }
  return `Player ${player} (${symbol} ), please enter the location you would like to play next: `;
}

function yourTurn(board, location) {

  if (location === board[location]) {
    return true;
  }
  return false;
}

function checkResult(board, counter) {

  function isTied() {
    return counter < 9 ? false : true;
  }

  var winner;
  function checkForWinningStreak(board, triad) {

    if (board[triad[0]] === board[triad[1]]) {
      if (board[triad[1]] === board[triad[2]]) {
        winner = board[triad[0]];
        return true;
      }
    }
    return false;
  }

  function winningCombination() {
    var triads = [['A1','A2','A3'], ['B1','B2','B3'], ['C1','C2','C3'],
                  ['A1','B1','C1'], ['A2','B2','C2'], ['A3','B3','C3'],
                  ['A1','B2','C3'], ['A3','B2','C1']];

    var matches = triads.filter(function(triad) {
      return checkForWinningStreak(board, triad);
    });
    return matches.length > 0;
  }

  if (winningCombination()) {
    return 'Winner:' + winner + ' players!';
  } else if (isTied()) {
    return 'Tied';
  } else {
    return false;
  }
}

function aiMove(board) {

  function getAvailableLocations() {
    var availableLocations = [];

    for (var location in board) {

      if (yourTurn(board, location)) {
        availableLocations.push(location);
      }
    }
    return availableLocations;
  }
  
  var locationToChose;
  var counter = 0;

  getAvailableLocations().forEach(function(location) {
    if (Math.random() < 1 / counter++) {
      locationToChose = location;
    }
  });
  return locationToChose;
}


function playTheGame(vsAI) {

  var board = {
    A1: 'A1', A2: 'A2', A3: 'A3',
    B1: 'B1', B2: 'B2', B3: 'B3',
    C1: 'C1', C2: 'C2', C3: 'C3'
  };
  var playerMap = {'1': ' X', '2': ' O'};
  var currentPlayer = '1';
  var counter = 0;


  displayBoard (board);
  rl.setPrompt(getPrompt(currentPlayer, playerMap[currentPlayer], vsAI));
  rl.prompt();


  function afterEveryMove() {

    counter ++;
    displayBoard (board);

    var gameStatus = checkResult(board, counter);

    if (gameStatus) {
      console.log('Game over!', gameStatus);
      rl.close();

      return false;

    } else {
      currentPlayer = togglePlayer(currentPlayer);

      rl.setPrompt(getPrompt(currentPlayer, playerMap[currentPlayer], vsAI));
      rl.prompt();

      return true;
    }
  }

  function computerTakeTurn() {

    // Pausing for a moment makes the game feel more natural.
    setTimeout(function() {

      var location = aiMove(board);
      board[location] = playerMap[currentPlayer];

      afterEveryMove();

    }, 800);
  }


  rl.on('line', function(input) {

    if (yourTurn(board, input.toUpperCase())) {
      board[input.toUpperCase()] = playerMap[currentPlayer];

      if (afterEveryMove() && vsAI) {
        computerTakeTurn();
      }
    } else {
      displayBoard (board);
      console.log('You can\'t do that! Try again:');
    }
  });
}


rl.question('To play against a friend, press 1; To play against the computer, press 2: ', function (response) {

  if (response === '1') {
    playTheGame(false);

  } else {
    playTheGame(true);
  }
});