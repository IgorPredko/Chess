const gameBoard = document.querySelector("#gameboard");
const playerDisplay = document.querySelector("#player");
const infoDisplay = document.querySelector("#info-display");

const width = 8;
let playerGo = "black";
playerDisplay.textContent = "black";

const startPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
];

function createBoard() {
  startPieces.forEach((startPiece, i) => {
    const square = document.createElement("div");
    square.classList.add("square");
    square.innerHTML = startPiece;
    square.firstChild && square.firstChild.setAttribute("draggable", true);

    square.setAttribute("square-id", i);
    // square.classList.add("beige");
    const row = Math.floor((63 - i) / 8) + 1;
    if (row % 2 === 0) {
      square.classList.add(i % 2 === 0 ? "beige" : "darkGreen");
    } else {
      square.classList.add(i % 2 === 0 ? "darkGreen" : "beige");
    }

    if (i <= 15) {
      square.firstChild.firstChild.classList.add("black");
    }

    if (i >= 48) {
      square.firstChild.firstChild.classList.add("white");
    }

    gameBoard.append(square);
  });
}

createBoard();

const allSquares = document.querySelectorAll("#gameboard .square");

allSquares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
  square.addEventListener("dragover", dragOver);
  square.addEventListener("drop", dragDrop);
});

let startPositionId;
let draggedElement;

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute("square-id");
  draggedElement = e.target;
}
function dragOver(e) {
  e.preventDefault();
}

function dragDrop(e) {
  e.stopPropagation();
  const correctGo = draggedElement.firstChild.classList.contains(playerGo);
  const taken = e.target.classList.contains("piece");
  const valid = checkIfValid(e.target);
  const opponentGo = playerGo === "white" ? "black" : "white";
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo);

  if (correctGo) {
    if (takenByOpponent && valid) {
      e.target.parentNode.append(draggedElement);
      e.target.remove();
      changePlayer();
      return;
    }

    if (taken && !takenByOpponent) {
      // infoDisplay.textContent = "You cannot go here!";
      return;
    }
    if (valid) {
      e.target.append(draggedElement);
      changePlayer();
      return;
    }
  }
}

function checkIfValid(target) {
  console.log(target);
  const targetId =
    Number(target.getAttribute("square-id")) ||
    Number(target.parentNode.getAttribute("square-id"));
  const startId = Number(startPositionId);
  const piece = draggedElement.id;
  console.log("target Id", targetId);
  console.log("start Id", startId);
  console.log("piece", piece);

  switch (piece) {
    case "pawn":
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15];
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id = "${startId + width - 1} "]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id = "${startId + width + 1}" ]`)
            .firstChild)
      ) {
        return true;
      }
      break;
    case "knight":
      if (
        startId + width * 2 - 1 === targetId ||
        startId + width * 2 + 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId
      ) {
        return true;
      }
      break;
    case "bishop":
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild) ||
        // -------1st direction-------------
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 6 - 6}"]`)
            .firstChild) ||
        // -------2nd direction-------------
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 6 + 6}"]`)
            .firstChild) ||
        // -------3rd direction-------------
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild)
      ) {
        return true;
      }
      break;

    case "rook":
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`)) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`)) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`)) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`)) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 5}"]`)) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 5}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 6}"]`)) ||
        // -------1st
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`)) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`)) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`)) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`)) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 5}"]`)) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 5}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 6}"]`)) ||
        // --------2nd
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`)) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`)) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`)) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`)) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + 5}"]`)) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + 5}"]`) &&
          !document.querySelector(`[square-id = "${startId + 6}"]`)) ||
        // -----3rd
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`)) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`)) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`)) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`)) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - 5}"]`)) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - 5}"]`) &&
          !document.querySelector(`[square-id = "${startId - 6}"]`))
      ) {
        return true;
      }
      break;
    case "queen":
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild) ||
        // -------1st direction-------------
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 6 - 6}"]`)
            .firstChild) ||
        // -------2nd direction-------------
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 6 + 6}"]`)
            .firstChild) ||
        // -------3rd direction-------------
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`)) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`)) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`)) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`)) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 5}"]`)) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 5}"]`) &&
          !document.querySelector(`[square-id = "${startId + width * 6}"]`)) ||
        // -------1st
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`)) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`)) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`)) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`)) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 5}"]`)) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 5}"]`) &&
          !document.querySelector(`[square-id = "${startId - width * 6}"]`)) ||
        // --------2nd
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`)) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`)) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`)) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`)) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + 5}"]`)) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + 1}"]`) &&
          !document.querySelector(`[square-id = "${startId + 2}"]`) &&
          !document.querySelector(`[square-id = "${startId + 3}"]`) &&
          !document.querySelector(`[square-id = "${startId + 4}"]`) &&
          !document.querySelector(`[square-id = "${startId + 5}"]`) &&
          !document.querySelector(`[square-id = "${startId + 6}"]`)) ||
        // -----3rd
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`)) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`)) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`)) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`)) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - 5}"]`)) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - 1}"]`) &&
          !document.querySelector(`[square-id = "${startId - 2}"]`) &&
          !document.querySelector(`[square-id = "${startId - 3}"]`) &&
          !document.querySelector(`[square-id = "${startId - 4}"]`) &&
          !document.querySelector(`[square-id = "${startId - 5}"]`) &&
          !document.querySelector(`[square-id = "${startId - 6}"]`))
      ) {
        return true;
      }
      break;
    case "king":
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId - width === targetId ||
        startId + width - 1 === targetId ||
        startId + width + 1 === targetId ||
        startId - width - 1 === targetId ||
        startId - width + 1 === targetId
      ) {
        return true;
      }
  }
}

function changePlayer() {
  if (playerGo === "black") {
    reverseIds();
    playerGo = "white";
    playerDisplay.textContent = "white";
  } else {
    revertIds();
    playerGo = "black";
    playerDisplay.textContent = "black";
  }
}

function reverseIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) =>
    square.setAttribute("square-id", width * width - 1 - i)
  );
}

function revertIds() {
  const allSquares = document.querySelectorAll(".square");
  allSquares.forEach((square, i) => square.setAttribute("square-id", i));
}
