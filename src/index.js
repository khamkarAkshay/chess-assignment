const { getMovement } = require("./chess");

// Calculate posible moves for Pawn
const pawnMovement = getMovement("Pawn", "D4");
console.log("Pawn current position is 'D4'");
console.log("Pawn Movement", pawnMovement);

// Calculate posible moves for King
const kingMovement = getMovement("King", "D5");
console.log("King current position is 'D5'");
console.log("King Movement", kingMovement);

// Calculate posible moves for Queen
const queenMovement = getMovement("Queen", "D4");
console.log("Queen current position is 'D5'");
console.log("Queen Movement", queenMovement);