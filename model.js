import { Grid } from "./grid.js";
//import { displayBoard} from "./view.js";

window.addEventListener("load", init);

const GRID_HEIGHT = 30;
const GRID_WIDTH = 30;

let grid = new Grid(GRID_HEIGHT, GRID_WIDTH);
let isFirstLife = true;

function init() {
  console.log("Model kører");

  createBoard();
  createCells();
  isFirstLife = false;
  scanGrid();
}

function createCells() {
  const board = document.querySelector("#board");

  for (let row = 0; row < GRID_HEIGHT; row++) {
    for (let col = 0; col < GRID_WIDTH; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // adds the row and column data to the cell element
      cell.dataset.row = row;
      cell.dataset.col = col;
      // adds cell to the board
      board.appendChild(cell);

      if (isFirstLife === true) {
        if (Math.random() < 0.15) {
          grid.set(row, col, 1);
          cell.style.backgroundColor = "black";
        } else {
          grid.set(row, col, 0);
          cell.style.backgroundColor = "white";
        }
      }
    }
  }
}

function createBoard() {
  const board = document.querySelector("#board");
  board.style.setProperty("--GRID_WIDTH", GRID_WIDTH);
  board.style.setProperty("--GRID_HEIGHT", GRID_HEIGHT);
}

function countNeightbours(row, col) {
  console.log("count: ", row, ": ", col);
  let count = 0;
  const neighbourArray = grid.neighboursWithCheck(row, col);
  console.log(neighbourArray);

  for (const cell of neighbourArray) {
    if (cell === 1) {
      count++;
    }
  }
  return count;
}

function scanGrid() {
  console.log("scanGrid");
  let nextGeneration = new Grid(GRID_HEIGHT, GRID_WIDTH);

  console.log("grid: ", grid.grid);
  for (let row = 0; row < grid.row(); row++) {
    for (let col = 0; col < grid.col(); col++) {
      //console.log("col", col);
      const newValue = decideIfCellDiesOrLives(row, col);
      nextGeneration.set(row, col, newValue);
    }
    //init();
  }
}

function decideIfCellDiesOrLives(row, col) {
  let newValue;
  let value = grid.get(row, col);
  let neighbours = countNeightbours(row, col);
  if (neighbours < 2 || neighbours > 3) {
    newValue = 0;
  } else if (neighbours == 2) {
    newValue = value;
  } else if (neighbours == 3) {
    newValue = 1;
  }
  console.log("old value: ", value, " new value", newValue);
  return newValue;
}

export { init, createCells, createBoard, countNeightbours };
