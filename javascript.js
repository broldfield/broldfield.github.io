const playBtn = document.getElementById("playGame");
const player1P = document.getElementById("player1");
const player2P = document.getElementById("player2");

const gameBoard = (() => {
  let board = [
    ["Z", "Z", "Z"],
    ["Z", "Z", "Z"],
    ["Z", "Z", "Z"],
  ];

  const getBoard = () => {
    return board;
  };

  const reset = () => {
    board = [
      ["Z", "Z", "Z"],
      ["Z", "Z", "Z"],
      ["Z", "Z", "Z"],
    ];
  };

  //get row
  //get column
  const add = (value, row, column) => {
    board[row][column] = value;
  };

  const checkWin = (value) => {
    //Check Row for win condition
    for (let i = 0; i < board.length; i++) {
      if (
        board[i].every((element) => {
          return element == value;
        })
      ) {
        return true;
      }
    }

    //Check Column for Win Con
    //Turn Array Sideways
    for (let i = 0; i < board[0].length; i++) {
      let arrayCol = board.map((cell) => cell[i]);

      if (
        arrayCol.every((element) => {
          return element == value;
        })
      ) {
        return true;
      }
    }

    //Check Diagonals
    if (board[0][0] == value && board[1][1] == value && board[2][2] == value) {
      return true;
    }

    if (board[0][2] == value && board[1][1] == value && board[2][0] == value) {
      return true;
    }

    return false;
  };

  return { add, checkWin, reset, getBoard };
})();

const playerFactory = (player) => {
  let wins = 0;

  let currentPlayer = false;

  let playerType = player;

  const addWins = () => {
    wins++;
  };

  const getPlayerType = () => {
    return playerType;
  };

  const getWins = () => {
    return wins;
  };

  const reset = () => {
    wins = 0;
  };

  return { getWins, getPlayerType, addWins, reset, currentPlayer };
};

const playerX = playerFactory("X");
const playerO = playerFactory("O");
playerX.currentPlayer = true;

const displayController = (() => {
  const rows = [];
  rows[0] = document.getElementById("row1").getElementsByTagName("div");
  rows[1] = document.getElementById("row2").getElementsByTagName("div");
  rows[2] = document.getElementById("row3").getElementsByTagName("div");

  const updateBoard = () => {
    let board = gameBoard.getBoard();

    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        board[i][j] == "Z"
          ? (rows[i][j].textContent = "")
          : (rows[i][j].textContent = board[i][j]);
      }
    }
  };

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let colIndex = 0; colIndex < rows[rowIndex].length; colIndex++) {
      rows[rowIndex][colIndex].addEventListener(
        "click",
        (e) => {
          if (playerX.currentPlayer) {
            gameBoard.add(playerX.getPlayerType(), rowIndex, colIndex);
            console.log(gameBoard.getBoard());
            if (gameBoard.checkWin("X")) {
              console.log("win");
              playerX.addWins();
              player1P.textContent = `Player 1: ${playerX.getWins()}`;
            }
          }
          if (playerO.currentPlayer) {
            gameBoard.add(playerO.getPlayerType(), rowIndex, colIndex);
            if (gameBoard.checkWin("O")) {
              console.log("win");
              playerO.addWins();
              player2P.textContent = `Player 2: ${playerO.getWins()}`;
            }
          }
          e.stopPropagation();
          updateBoard();
          playerO.currentPlayer = !playerO.currentPlayer;
          playerX.currentPlayer = !playerX.currentPlayer;
        },
        false
      );
    }
  }
  updateBoard();

  return { updateBoard };
})();

const playGame = () => {
  gameBoard.reset();
  displayController.updateBoard();
};

playBtn.addEventListener("click", () => {
  playGame();
}),
  false;
