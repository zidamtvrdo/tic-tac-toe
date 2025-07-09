// create table as iffy function
const createTable = (function() {
    const table = [];

    for (let i = 0; i < 3; i++) {
        table[i] = [];
        for (let j = 0; j < 3; j++) {
            table[i][j] = '-';
        }
    };

    return {table};
})();

// factory function to make two players 
const createPlayer = function (name, sign) {
    return {name, sign}
}


// control the game
const gameController = function () {

    const checkInput = (input) => {
        console.log(input);
        if ((input == null) || (input.length !== 2)) {
            console.log('Wrong input.')
        } else {
            const parsedInput= input.split('').map(element => parseInt(element));
            if (parsedInput.includes(NaN)) {
                console.log('Wrong input.')
            } else {
                const [row, column] = parsedInput;
                return [row, column]
            }
        }
    }

    const checkWinner = (table, player1, player2) => {
        let winner;
        if (
            (table[0][0] == 'X' && table[0][1] == 'X' && table[0][2] == 'X') || 
            (table[1][0] == 'X' && table[1][1] == 'X' && table[1][2] == 'X') || 
            (table[2][0] == 'X' && table[2][1] == 'X' && table[2][2] == 'X') || 
            (table[0][0] == 'X' && table[1][0] == 'X' && table[2][0] == 'X') ||
            (table[0][1] == 'X' && table[1][1] == 'X' && table[2][1] == 'X') || 
            (table[0][2] == 'X' && table[1][2] == 'X' && table[2][2] == 'X') || 
            (table[0][0] == 'X' && table[1][1] == 'X' && table[2][2] == 'X') || 
            (table[0][2] == 'X' && table[1][1] == 'X' && table[2][0] == 'X')
        ) {
            winner = player1;
            isEnd = true;
            console.log(`${winner.name} ${winner.sign} won!`);
        } else if (
            (table[0][0] == 'O' && table[0][1] == 'O' && table[0][2] == 'O') || 
            (table[1][0] == 'O' && table[1][1] == 'O' && table[1][2] == 'O') || 
            (table[2][0] == 'O' && table[2][1] == 'O' && table[2][2] == 'O') || 
            (table[0][0] == 'O' && table[1][0] == 'O' && table[2][0] == 'O') || 
            (table[0][1] == 'O' && table[1][1] == 'O' && table[2][1] == 'O') || 
            (table[0][2] == 'O' && table[1][2] == 'O' && table[2][2] == 'O') || 
            (table[0][0] == 'O' && table[1][1] == 'O' && table[2][2] == 'O') || 
            (table[0][2] == 'O' && table[1][1] == 'O' && table[2][0] == 'O')
        ) {
            winner = player2;
            isEnd = true;
            console.log(`${winner.name} ${winner.sign} won!`);
        } else if (history.length == 9) {
            winner = 'Nobody';
            isEnd = true;
            console.log(`${winner.name} ${winner.sign} won!`);
        }

    }
    
    const switchPlayer = (player1, player2) => {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    // import table
    const gameBoard = createTable.table;

    // create players
    const playerOne = createPlayer('Player One', 'X');
    const playerTwo = createPlayer('Player Two', 'O');

    const history = []

    let isEnd = false;
    let currentPlayer = playerOne;

    while (!isEnd) {

        const playerChoice = prompt(`Player ${currentPlayer.name} turn.`);

        const returnedChoice = checkInput(playerChoice);

        if (returnedChoice !== undefined) {
            const [row, column] = returnedChoice;
            if (gameBoard[row][column] == '-') {
                gameBoard[row][column] = currentPlayer.sign;
                history.push(currentPlayer.sign)
            } else {
                console.log(`This place is already full. row: ${row} column: ${column}`);
            }
        } else {
            isEnd = true;
        }


        switchPlayer(playerOne, playerTwo);

        checkWinner(gameBoard, playerOne, playerTwo);

        console.log(gameBoard.map(row => row.map(element => element)))
    }
}
gameController();