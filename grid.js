export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  get(row, col) {
    let value = this.grid[row][col];
    return value;
  }

  set(row, col, value) {
    this.grid[row][col] = value;
  }

  indexFor(row, col) {
    return row * this.cols + col;
  }

  rowColFor(index) {
    const row = Math.floor(index / this.cols);
    const col = index % this.rows;
    return this.grid[row][col];
  }

  neighboursWithCheck(row, col) {
    if (row === 0) {
      if (col == 0) {
        // this is NORTH WEST
        const e = this.east(row, col);
        const s = this.south(row, col);
        const se = this.south_east(row, col);
        return [e, s, se];
      } else if (col === this.cols - 1) {
        // this is NORTH EAST
        const w = this.west(row, col);
        const s = this.south(row, col);
        const sw = this.south_west(row, col);
        return [w, s, sw];
      } else {
        // this is top North
        const e = this.east(row, col);
        const se = this.south_east(row, col);
        const w = this.west(row, col);
        const sw = this.south_west(row, col);
        const s = this.south(row, col);
        return [e, se, w, s, sw];
      }
    } else if (row === this.rows - 1) {
      if (col === 0) {
        // this is sout west
        const n = this.north(row, col);
        const ne = this.north_east(row, col);
        const e = this.east(row, col);
        return [n, ne, e];
      } else if (col === this.cols - 1) {
        // this is south east
        const n = this.north(row, col);
        const w = this.west(row, col);
        const nw = this.north_west(row, col);
        return [n, w, nw];
      } else {
        // this is bot South
        const n = this.north(row, col);
        const ne = this.north_east(row, col);
        const e = this.east(row, col);
        const nw = this.north_west(row, col);
        const w = this.west(row, col);
        return [n, ne, e, nw, w];
      }
    } else if (col === 0) {
      // this is far West
      const n = this.north(row, col);
      const ne = this.north_east(row, col);
      const e = this.east(row, col);
      const s = this.south(row, col);
      const sw = this.south_east(row, col);
      return [n, ne, e, s, sw];
    } else if (col === this.cols - 1) {
      // this is far ests
      const n = this.north(row, col);
      const nw = this.north_west(row, col);
      const w = this.west(row, col);
      const s = this.south(row, col);
      const sw = this.south_west(row, col);
      return [n, nw, w, s, sw];
    } else {
      return this.neighbours(row, col);
    }
  }

  neighbours(row, col) {
    // if (row > this.rows.length && col > this.cols.length) {
    //   return undefined;
    // }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.north_west(row, col);
    let north_east = this.north_east(row, col);
    let south_west = this.south_west(row, col);
    let south_east = this.south_east(row, col);
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    console.log("neighbours");
    console.log(neighbours);
    return neighbours;
  }

  neighboursValue(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }

    let neighbours = [];

    let north = this.north(row, col);
    let north_west = this.north_west(row, col);
    let north_east = this.north_east(row, col);
    let south_west = this.south_west(row, col);
    let south_east = this.south_east(row, col);
    let south = this.south(row, col);
    let west = this.west(row, col);
    let east = this.east(row, col);

    neighbours.push(
      north,
      south,
      east,
      west,
      north_west,
      north_east,
      south_east,
      south_west
    );

    let interator = neighbours.values();
    for (const value of interator) {
      console.log(value);
    }
  }

  nextInRow(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }

  north(row, col) {
    if (row - 1 < 0) {
      return undefined;
    }
    let value = this.grid[row - 1][col];
    return value;
  }

  north_west(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row - 1][col - 1];
    return value;
  }

  north_east(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row - 1][col + 1];
    return value;
  }

  south(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row + 1][col];
    return value;
  }

  south_west(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row + 1][col - 1];
    return value;
  }

  south_east(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row + 1][col + 1];
    return value;
  }

  west(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col - 1];
    return value;
  }

  east(row, col) {
    if (row > this.rows.length && col > this.cols.length) {
      return undefined;
    }
    let value = this.grid[row][col + 1];
    return value;
  }

  row() {
    return this.rows;
  }

  col() {
    return this.cols;
  }

  size() {
    return this.rows * this.cols;
  }

  fill(value) {
    for (let row = 0; row < this.rows.length; row++) {
      for (let col = 0; col < this.cols.length; col++) {
        this.grid[row][col] = value;
      }
    }
  }

  dump() {
    console.table(this.grid);
  }
}
