import { Grid } from "./grid.js";
//import { displayBoard} from "./view.js";

window.addEventListener("load", init);

const GRID_HEIGHT = 30;
const GRID_WIDTH = 30;

let grid = new Grid(GRID_HEIGHT, GRID_WIDTH);
const isFirstLife = true;

function init() {
    console.log("Model kører");

    createBoard();
    createCells();
    //scanGrid();
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
    let count = 0;
    for (let y = -1; x <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            // Avoid counting myself
            if (x != 0 && y != 0) {
                //
                count += grid.get(row + y, col + x);
            }
        }
    }
    return count;
}

// - < 2 naboer - cellen dør af ensomhed
// - 2 naboer - cellen lever videre, hvis den altså var levende
// - 3 naboer - en ny celle bliver født, eller lever videre, hvis der var en
// - > 3 naboer - cellen død af overbefolkning

function scanGrid() {
    let nextGeneration = new Grid(GRID_HEIGHT, GRID_WIDTH);

    for (const row of grid.grid) {
        for (const col of row) {
            const newValue = decideIfCellDiesOrLives(row, col);
            nextGeneration.set(row,col, newValue);
        }
    }
    // call VIEW/ new HTML
}

function decideIfCellDiesOrLives(row, col) {
    let newValue;
    for (let rows = 0; rows < grid.row.length; rows++) {
        for (let cols = 0; cols < grid.col.length; cols++) {
            let value = grid[row][col];
            let neighbours = countNeightbours(row, col);
            if (neighbours < 2 || neighbours > 3) {
                newValue = 0;
            } else if (neighbours == 2) {
                newValue = value;
            } else if (neighbours == 3) {
                newValue = 1;
            }
        }
    }
    return newValue;
    // Instentiere et nyt grid...
    // vi sætter værdi ind i nyt grid/array - grid.set(row, col, newValue)...
    // nexInRow...  IF NONE så -> nextInGrid... ind til STOP!
    // kald funktionen igen....
}

export { init, createCells, createBoard, countNeightbours };
