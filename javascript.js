const gameBoard = (() => {
  let board = [
    ["Y", "Y", "X"],
    ["Y", "X", "X"],
    ["X", "Y", "X"],
  ];

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

  return { add, checkWin, reset };
})();

// gameBoard.add("X", 0, 2);

console.log(`X: ${gameBoard.checkWin("X")}`);
console.log(`Y: ${gameBoard.checkWin("Y")}`);

gameBoard.reset();
