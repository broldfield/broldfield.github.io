const playBtn = document.getElementById("playGame");

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
        return 1;
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
        return 1;
      }
    }

    //Check Diagonals
    if (board[0][0] == value && board[1][1] == value && board[2][2] == value) {
      return 1;
    }

    if (board[0][2] == value && board[1][1] == value && board[2][0] == value) {
      return 1;
    }

    return 0;
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

// gameBoard.add("X", 0, 2);

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
        // rows[i][j].textContent = board[i][j];
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
            // console.log(rowIndex, colIndex, playerX.getPlayerType());
            // console.log("X");
            console.log(gameBoard.getBoard());
          }
          if (playerO.currentPlayer) {
            gameBoard.add(playerO.getPlayerType(), rowIndex, colIndex);
            console.log("O");
          }
          e.stopPropagation();
          updateBoard();
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
  console.log("Clicked");
}),
  false;

// console.log(gameBoard.getBoard());

// console.log(`X: ${gameBoard.checkWin("X")}`);
// console.log(`Y: ${gameBoard.checkWin("Y")}`);

// gameBoard.reset();
