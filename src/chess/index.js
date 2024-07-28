/**
 * Constant for direction of Piece (King, Queen & Pawn)
 */

const directions = {
  king: {
    moves: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ],
    steps: 1,
  },
  queen: {
    moves: [
      [-1, 1],
      [0, 1],
      [1, 1],
      [-1, 0],
      [1, 0],
      [-1, -1],
      [0, -1],
      [1, -1],
    ],
    steps: 8,
  },
  pawn: {
    moves: [
      [0, 1],
      [0, -1],
    ],
    steps: 1,
  },
};

/**
 * Generate the chess board of 64 cells. Each cell is represented by the string containing column and row.
 * Columns are denoted with alphabets (A-H) and Rows are denoted with numbers (1-8)
 * 
 * @returns {string[]} returns array of alphanumeric values eg. ["A1", "B1", "C1", ...]
 */

function generateBorad() {
  const board = [];
  for (let index = 0; index < 64; index++) {
    const rowIndex = Math.floor(index / 8);
    const colIndex = index % 8;
    const character = (colIndex + 10).toString(36).toUpperCase();
    board.push(`${character}${rowIndex + 1}`);
  }
  return [...board];
}

/**
 * Generates the path string on basis of position, directions and steps to be moved.
 *
 * @param {string} position - indicates the current position of piece, eg. "B5"
 * @param {number[][]} directions - direction indicates all the possible movements for piece
 * @param {number} steps - number of steps piece is allowed to move
 * @returns {string} returns string of aplhanumeric values eg. "A1, B1, ..."
 */

function getPiecePath(position, directions, steps) {
  const columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const rows = [1, 2, 3, 4, 5, 6, 7, 8];
  const [positionCol, positionRow] = position.split("");
  const path = [];
  const columnIndex = columns.indexOf(positionCol);
  const rowIndex = parseInt(positionRow) - 1;

  for (const [columnMove, rowMove] of directions) {
    for (let stepIndex = 1; stepIndex <= steps; stepIndex++) {
      const newColumn = columnIndex + columnMove * stepIndex;
      const newRow = rowIndex + rowMove * stepIndex;
      if (
        newColumn >= 0 &&
        newColumn < columns.length &&
        newRow >= 0 &&
        newRow < rows.length
      ) {
        const newPosition = columns[newColumn] + rows[newRow];
        path.push(newPosition);
      }
    }
  }

  return [...path].join(", ");
}

/**
 * Generates the path string for Pawns on basis of position, directions and steps to be moved.
 * Pawns cannot move if they are on the first or eighth row.
 *
 * @param {string} position - indicates the current position of piece, eg. "B5"
 * @param {number[][]} directions - direction indicates all the possible movements for piece
 * @param {number} steps - number of steps piece is allowed to move
 * @returns {string} returns string of aplhanumeric values eg. "A1, B1, ..."
 */

function getPawnPath(position, directions, steps) {
  const positionRow = position.split("")[1];
  if (parseInt(positionRow) === 1 || parseInt(positionRow) === 8) {
    return "No further move left";
  }

  return getPiecePath(position, directions, steps);
}

/**
 * Determines the path for a given chess piece from a specified position.
 * Validates the position and piece type before calculating the path.
 *
 * @param {string} piece - The type of chess piece, e.g., "pawn", "king", "queen".
 * @param {string} position - The current position of the piece, e.g., "D4".
 * @returns {string} - A comma-separated string of all valid positions the piece can move to, or an error message if the position or piece is invalid.
 */

function getMovement(piece, position) {
  const board = generateBorad();
  if (!board.includes(position)) return "Invalid position";
  switch (piece?.toLowerCase()) {
    case "pawn":
      return getPawnPath(
        position,
        directions.pawn.moves,
        directions.pawn.steps
      );
    case "king":
      return getPiecePath(
        position,
        directions.king.moves,
        directions.king.steps
      );
    case "queen":
      return getPiecePath(
        position,
        directions.queen.moves,
        directions.queen.steps
      );
    default:
      return "Invalid piece";
  }
}

module.exports = { generateBorad, getMovement, getPawnPath };
