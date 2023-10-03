/*  A simple Tic-Tac-Toe game
Players 'X' and 'O' take turn inputing their position on the command line using numbers 1-9
1 | 2 | 3
---------
4 | 5 | 6
---------
7 | 8 | 9
*/

// importing user import library
const prompt = require('prompt-sync')({sigint: true});
const assert = require('assert');

// The board object used to save the current status of a gameplay
let board = {
    1: ' ',
    2: ' ',
    3: ' ',
    4: ' ',
    5: ' ',
    6: ' ',
    7: ' ',
    8: ' ',
    9: ' '
};

// TODO: update the gameboard with the user input
function markBoard(position, mark) {
    if (position >=1 && position <= 9 && board[position] === " "){
        board[position] = mark;
    }
}

// TODO: print the game board as described at the top of this code skeleton
// Will not be tested in Part 1
function printBoard() {
    console.log(` ${board[1]} | ${board[2]} | ${board[3]}`);
    console.log("-----------");
    console.log(` ${board[4]} | ${board[5]} | ${board[6]}`);
    console.log("-----------");
    console.log(` ${board[7]} | ${board[8]} | ${board[9]}`);
}


// TODO: check for wrong input, this function should return true or false.
// true denoting that the user input is correct
// you will need to check for wrong input (user is entering invalid position) or position is out of bound
// another case is that the position is already occupied
// position is an input String
function validateMove(position) {
    if(typeof position === "string"){
        position = parseInt(position, 10);
    }
    if (position < 1 && position > 9){
        return false;
    }
    if(board[position] !== " "){
        return false;
    }
    return true;
}

// TODO: list out all the combinations of winning, you will neeed this
// one of the winning combinations is already done for you
let winCombinations = [
    [1, 2, 3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]
];

// TODO: implement a logic to check if the previous winner just win
// This method should return with true or false
function checkWin(player) {
    for (let i = 0; i < winCombinations.length; i++) {
        const combo = winCombinations[i];
        let matchCount = 0;
        for (j = 0; j < combo.length; j++) {
            if (board[combo[j]] === player) {
                matchCount++;
            }
        }
        if (matchCount >= 3) {
          return true;
        }
    }
    return false;
}

// TODO: implement a function to check if the game board is already full
// For tic-tac-toe, tie bascially means the whole board is already occupied
// This function should return with boolean
function checkFull() {
    for(i = 1; i <= 9; i++){
        if(board[i] === " "){
            return false;
        }
    }
    return true;
}

// TODO: the main part of the program
// This part should handle prompting the users to put in their next step, checking for winning or tie, etc
function playTurn(player) {
    let position = prompt(`${player}'s turn, input: `);
    if (validateMove(position)){
        markBoard(position, currentTurnPlayer);
        printBoard();
        if (checkWin(player)) {
            console.log(`Congrats! ${player} wins!`);
            winnerIdentified = true;
        } else if (checkFull()) {
            console.log("It's a tie!");
            winnerIdentified = true;
        } else {
            currentTurnPlayer = currentTurnPlayer === "X" ? "O":"X";
        }
    }else {
        console.log("Invalid move, please try again.")
    }
}

// entry point of the whole program
console.log('Game started: \n\n' +
    ' 1 | 2 | 3 \n' +
    ' --------- \n' +
    ' 4 | 5 | 6 \n' +
    ' --------- \n' +
    ' 7 | 8 | 9 \n');

let continuePlaying = true;
let currentTurnPlayer = 'X';
let winnerIdentified = false;

function resetBoard() {
    for (i = 1; i <= 9; i++){
        board[i] = " ";
    }
}

while (continuePlaying){
    while (!winnerIdentified){
        playTurn(currentTurnPlayer);
        // feel free to add logic here if needed, e.g. announcing winner or tie
    }

    // Bonus Point: Implement the feature for the user to restart the game after a tie or game over
    let newGame = prompt("Restart new game? (Y/N) :");
    newGame = newGame.toUpperCase();

    if (newGame === "N"){
        continuePlaying = false;
        console.log("Thank you for playing!");
    } else if (newGame === "Y"){
        let choosePlayer = prompt("Choose your player (X/O): ");
        choosePlayer = choosePlayer.toUpperCase();
        
        if(choosePlayer === "X" || choosePlayer === "O"){
            currentTurnPlayer = choosePlayer;
            winnerIdentified = false;
            resetBoard();
            playTurn(currentTurnPlayer);
        }else {
            console.log("Invalid player choice. Game over.");
        }
    }
}
