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
    // import table
    const table = createTable.table;

    // create players
    const player1 = createPlayer('One', 'X');
    const player2 = createPlayer('Two', 'O');

    const history = []
    let isEnd = false;
    while (!isEnd) {
        let currentPlayer = player1;
            if (history[history.length - 1] == 'X') {
                currentPlayer = player2;
            } else currentPlayer = player1;

        const playerChoice = prompt(`Player ${currentPlayer.name} turn.`);
        const [row, column] = playerChoice;

        if (playerChoice == '') {
            console.log(table);
            break;
        }

        if (table[row][column] == '-') {
            table[row][column] = currentPlayer.sign;
            history.push(currentPlayer.sign)
        } else {
            console.log('This place is already full. Try some other');
        }

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
            console.log('player 1 won.');
            isEnd = true;
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
            console.log('player 2 won.');
            isEnd = true;
        } else if (history.length == 9) {
            console.log ('draw');
            isEnd = true;
        }
    }
}
gameController();