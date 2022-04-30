function Board(){
    this.rows = 6;
    this.cols = 7;
    this.board = new Array(this.rows); 
    for (let i = 0; i < this.board.length; i++){
        this.board[i] = new Array(this.cols).fill(0); //fill allows us to set the default values of the array
    }
    this.redTurn = true;
    this.isWon = false;
}

Board.prototype.makeMove = function(col){
    //check if move is possible
    if (col > this.cols - 1 || this.board[0][col] !== 0){
        alert("Invalid Move")
    }else{
        //put correct colour in correct spot
        for (let i = this.rows - 1; i > -1; i--){
            if (this.board[i][col] === 0){
                this.board[i][col] = this.redTurn ? 'r' : 'y';  //if its red turn put down an 'r' otherwise a yellow
                this.redTurn = !this.redTurn;  //make the turns opposite
                this.checkWin(i, col);
                break;
            }
        }
    }
}

Board.prototype.checkWin = function(x, y){
    this.isWon = this.checkHorizonal(x, y) || this.checkVertical(x, y) || this.checkLeftDiagonal(x, y) || this.checkRightDiagonal(x, y);
}

Board.prototype.checkHorizonal = function(x, y){
    let colour = this.board[x][y];
    let count = 1; //amount of the colour we have
    let ind = y + 1;
    while (count < 4 && ind < this.cols){ //keep going right unless 4 in a row or ind surpasses the boundary
        if (this.board[x][ind] !== colour) break;
        count++;
        ind++;
    }

    ind = y - 1;
    while (count < 4 && ind > -1){ //keep going left unless 4 in a row or ind surpasses the boundary
        if (this.board[x][ind] !== colour) break;
        count++;
        ind--;
    }

    return count >= 4; //return whether we have a win or not
}

Board.prototype.checkVertical = function(x, y){
    let colour = this.board[x][y];
    let count = 1; //amount of the colour we have
    let ind = x + 1;
    while (count < 4 && ind < this.rows){ //keep going down unless 4 in a row or ind surpasses the boundary
        if (this.board[ind][y] !== colour) break;
        count++;
        ind++;
    }

    ind = x - 1;
    while (count < 4 && ind > -1){ //keep going up unless 4 in a row or ind surpasses the boundary
        if (this.board[ind][y] !== colour) break;
        count++;
        ind--;
    }

    return count >= 4; //return whether we have a win or not
}

Board.prototype.checkLeftDiagonal = function(x, y){
    let colour = this.board[x][y];
    let count = 1; //amount of the colour we have
    let xind = x - 1;
    let yind = y - 1;
    while (count < 4 && xind > -1 && yind > -1){ //keep going up left unless 4 in a row or ind surpasses the boundary
        if (this.board[xind][yind] !== colour) break;
        count++;
        xind--;
        yind--;
    }

    xind = x + 1;
    yind = y + 1;
    while (count < 4 && xind < this.rows && yind < this.cols){ //keep going down right unless 4 in a row or ind surpasses the boundary
        if (this.board[xind][yind] !== colour) break;
        count++;
        xind++;
        yind++;
    }

    return count >= 4;
}

Board.prototype.checkRightDiagonal = function(x, y){
    let colour = this.board[x][y];
    let count = 1; //amount of the colour we have
    let xind = x - 1;
    let yind = y + 1;
    while (count < 4 && xind > -1 && yind < this.cols){ //keep going up right unless 4 in a row or ind surpasses the boundary
        if (this.board[xind][yind] !== colour) break;
        count++;
        xind--;
        yind++;
    }

    xind = x + 1;
    yind = y - 1;
    while (count < 4 && xind < this.rows && yind > -1){ //keep going down left unless 4 in a row or ind surpasses the boundary
        if (this.board[xind][yind] !== colour) break;
        count++;
        xind++;
        yind--;
    }

    return count >= 4;
}

Board.prototype.clearBoard = function(){
    for (let i = 0; i < this.rows; i++){
        for (let j =0; j < this.cols; j++){
            this.board[i][j] = 0;
        }
    }
    this.redTurn = true;
    this.isWon = false;
}