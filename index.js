const outerGame = (function () {

    const createPlayer = (name, sign) => {
        return {name, sign}
    }

    const playerOne = createPlayer(prompt('Name of player One: '), 'X');
    const playerTwo = createPlayer(prompt('Name of player Two: '), 'O');


    const repeat = document.createElement('button');
    repeat.textContent = 'REPEAT';
    document.body.appendChild(repeat);
    repeat.style.display = 'none';

    const board = document.querySelector('#board');
    const announceWinnerEl = document.createElement('h1');
    document.body.appendChild(announceWinnerEl);

    function gameController () {
        const boardElements = Array.from(board.childNodes).filter(element => element.nodeType == '1');
        let currentPlayer = playerOne;

        const switchPlayer = (player1, player2) => {
            currentPlayer = currentPlayer == player1 ? player2 : player1;
        }

        const showAfterRound = () => {
            board.style.display = 'none';
            repeat.style.display = 'block';
            boardElements.forEach(element => element.removeEventListener('click', handleClick));
        }

        const [
            rowOneA, rowOneB, rowOneC,
            rowTwoA, rowTwoB, rowTwoC,
            rowThreeA, rowThreeB, rowThreeC
        ] = boardElements;

        boardElements.map(element => element.style.fontSize = '100px');

        repeat.addEventListener('click', () => {
            boardElements.map(element => element.textContent = '');
            announceWinnerEl.textContent = '';
            boardElements.forEach(element => element.addEventListener('click', handleClick));
            board.style.display = 'grid';
            repeat.style.display = 'none';
        }
    );

        // Refactor this is temporary code just to make game work.
        const checkWinner = (r0c0El, r0c1El, r0c2El, r1c0El, r1c1El, r1c2El, r2c0El, r2c1El, r2c2El, player1, player2) => {

            let winner;

            const r0c0 = r0c0El.textContent;
            const r0c1 = r0c1El.textContent;
            const r0c2 = r0c2El.textContent;
            const r1c0 = r1c0El.textContent;
            const r1c1 = r1c1El.textContent;
            const r1c2 = r1c2El.textContent;
            const r2c0 = r2c0El.textContent;
            const r2c1 = r2c1El.textContent;
            const r2c2 = r2c2El.textContent;

            if (
                (r0c0 == 'X' && r0c1 == 'X' && r0c2 == 'X') || 
                (r1c0 == 'X' && r1c1 == 'X' && r1c2 == 'X') || 
                (r2c0 == 'X' && r2c1 == 'X' && r2c2 == 'X') || 
                (r0c0 == 'X' && r1c0 == 'X' && r2c0 == 'X') ||
                (r0c1 == 'X' && r1c1 == 'X' && r2c1 == 'X') || 
                (r0c2 == 'X' && r1c2 == 'X' && r2c2 == 'X') || 
                (r0c0 == 'X' && r1c1 == 'X' && r2c2 == 'X') || 
                (r0c2 == 'X' && r1c1 == 'X' && r2c0 == 'X')
            ) {
                winner = player1;
                announceWinnerEl.textContent = `${winner.name} -> ${winner.sign} <- won!`
                showAfterRound();
            } else if (
                (r0c0 == 'O' && r0c1 == 'O' && r0c2 == 'O') || 
                (r1c0 == 'O' && r1c1 == 'O' && r1c2 == 'O') || 
                (r2c0 == 'O' && r2c1 == 'O' && r2c2 == 'O') || 
                (r0c0 == 'O' && r1c0 == 'O' && r2c0 == 'O') ||
                (r0c1 == 'O' && r1c1 == 'O' && r2c1 == 'O') || 
                (r0c2 == 'O' && r1c2 == 'O' && r2c2 == 'O') || 
                (r0c0 == 'O' && r1c1 == 'O' && r2c2 == 'O') || 
                (r0c2 == 'O' && r1c1 == 'O' && r2c0 == 'O')
            ) {
                winner = player2;
                announceWinnerEl.textContent = `${winner.name} -> ${winner.sign} <- won!`
                showAfterRound();
            } else if (boardElements.every(element => element.textContent !== '')) {
                announceWinnerEl.textContent = 'Draw!';
                showAfterRound();
            }
        }

        const handleClick = (e) => {
            if (e.target.textContent == '') {
                e.target.textContent = currentPlayer.sign;
                switchPlayer(playerOne, playerTwo);
                checkWinner(rowOneA, rowOneB, rowOneC, rowTwoA, rowTwoB, rowTwoC, rowThreeA, rowThreeB, rowThreeC, playerOne, playerTwo);
            }
        }

        boardElements.forEach(element => element.addEventListener('click', handleClick));
    }

    gameController();
})();
