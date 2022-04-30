{
    //grab all the tile elements
    let tiles = document.getElementsByClassName("gridItem");
    //grap the play again button
    let playAgain = document.getElementById("restartbtn");
    //grab the score and best elements
    let score = document.getElementById("playerScore");
    let best = document.getElementById("playerBest")
    //initialize a board
    let gameActive = false;
    let b = new Board();

    playGame(b, tiles);

    function playGame(board, tiles){
        for (let i = 0; i < 2; i++) board.placeRandom();
        gameActive = true;
        updateTiles(board, tiles);
    }

    //make a function which updates the tile text
    function updateTiles(b, tiles){
        let colours = {0:"#D2C2B2", 2:"#FFE7C7", 4:"#A9A989", 8:"#99A989", 16:"#89A989", 32:"#89A999", 64:"#89A9A9", 128:"#89A9A9", 264:"#8999A9", 528:"#9989A9", 1024:"#A989A9", 2048:"#A98999"};
        for (let i = 0; i < b.size; i++){
            for (let j = 0; j < b.size; j++){
                let tile = tiles[4*i + j];
                //console.log(tile);
                if (b.board[i][j] === 0){
                    tile.innerHTML = "";
                    
                } else{
                    tile.innerHTML = b.board[i][j].toString();
                    //change colours depending on value....
                }
                tile.style.backgroundColor = colours[b.board[i][j]];
            }
        }
    }

    //make a function which updates the score stuff
    function updateScore(board){
        score.innerHTML = "Score: " + board.score.toString();
        if (board.score > board.best){
            board.best = board.score;
            best.innerHTML = "Best: " + board.best.toString();
        }
    }

    //function that deals with keyboard inputs:
    document.addEventListener('keydown', (event) => {
        if (gameActive){
            if (event.code === "ArrowLeft"){
                b.makeMove("L");
            } else if (event.code === "ArrowRight"){
                b.makeMove("R");
            } else if (event.code === "ArrowUp"){
                event.preventDefault();  //prevent default will stop the arrow keys from moving the page up and down
                b.makeMove("U");
            } else if (event.code === "ArrowDown"){
                event.preventDefault();
                b.makeMove("D");
            }

            updateTiles(b, tiles);
            updateScore(b);

            if (b.isGameWon()) gameActive = false;
            if (!b.isAnyValidMove()){
                gameActive = false;
                alert("You Lose");
            }
        }
    }, false);

    playAgain.onclick = () => {
        b.resetBoard();
        updateScore(b);
        playGame(b, tiles);
    }
}