const chess = require("../chess");
const { mockBoard } = require("./data.mock");

describe("1: Generate Board", () => {
  test("1.0: Validate Chess Board", () => {
    const board = chess.generateBorad();
    expect(board).toEqual(mockBoard);
  });
});

describe("2: Piece Movement", () => {
  test("2.1: Validate Pawn Movement", () => {
    const pawnPath = chess.getMovement("Pawn", "G2");
    expect(pawnPath).toEqual("G3, G1");
  });

  test("2.2: Last Cell Pawn Movement", () => {
    const pawnPathA1 = chess.getMovement("Pawn", "A1");
    const pawnPathH8 = chess.getMovement("Pawn", "H8");
    expect(pawnPathA1).toEqual("No further move left");
    expect(pawnPathH8).toEqual("No further move left");
  });

  test("2.3: Validate King Movement", () => {
    const kingPath = chess.getMovement("King", "A1");
    expect(kingPath).toEqual("A2, B2, B1");
  });

  test("2.4: Validate Queen Movement", () => {
    const kingPath = chess.getMovement("Queen", "E4");
    expect(kingPath).toEqual(
      "D5, C6, B7, A8, E5, E6, E7, E8, F5, G6, H7, D4, C4, B4, A4, F4, G4, H4, D3, C2, B1, E3, E2, E1, F3, G2, H1"
    );
  });

  test("2.5: Validate Invalid Position", () => {
    const path = chess.getMovement("Queen", "Q3");
    expect(path).toEqual("Invalid position");
  });

  test("2.6: Validate Invalid Piece", () => {
    const path = chess.getMovement("Knight", "A3");
    expect(path).toEqual("Invalid piece");
  });
});
