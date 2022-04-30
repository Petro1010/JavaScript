//creating a board constructer
function Board(){
    this.size = 4;
    this.board = new Array(this.size);
    //make the 2 by 2 array
    for (let i = 0; i < this.board.length; i++){
        this.board[i] = new Array(this.size).fill(0);
    }
    //console.log(this.board);
    this.score = 0;
    this.best = 0;
    this.max = 2048;
}

Board.prototype.randomNum = function(){
    let randNum = Math.random();
    return randNum < 0.2 ? 4 : 2;  //20% chance of spawining a 4
}

Board.prototype.placeRandom = function(){
    //make sure theres a spot to place something
    if (this.hasEmpty()){
        notPlaced = true;
        //loop until we find an empty spot, then put either a 2 or 4 there
        while (notPlaced){
            let x = Math.floor(Math.random() * (this.size) );
            let y = Math.floor(Math.random() * (this.size) );
            if (this.board[x][y] === 0){
                this.board[x][y] = this.randomNum();
                notPlaced = false;
            }
        }
    }
}

Board.prototype.hasEmpty = function(){
	for (let i = 0; i < this.size; i++){
		for (let j = 0; j < this.size; j++){
			if (this.board[i][j] === 0){
				return true;
			}
		}
	}

	return false; //if no empty slots return false
}


//updating the board following a move
Board.prototype.updateBoard = function(dir){
    if (dir === "D") {
        if (this.isValidMoveDown()) {
            this.shiftDown();
            this.addDown();
            this.shiftDown();
            return true;
        }
        
        else {
            alert("No possible moves down");
            return false;
        }
        
        
    }
    
    else if (dir === "U") {
        if (this.isValidMoveUp()) {
            this.shiftUp();
            this.addUp();
            this.shiftUp();
            return true;
        }
        
        else {
            alert("No possible moves up");
            return false;
        }
        
    }
    
    else if (dir === "L") {
        if (this.isValidMoveLeft()) {
            this.shiftLeft();
            this.addLeft();
            this.shiftLeft();
            return true;
        }
        
        else {
            alert("No possible moves left");
            return false;
        }
        
    }
    
    else {
        if (this.isValidMoveRight()) {
            this.shiftRight();
            this.addRight();
            this.shiftRight();
            return true;
        }
        
        else {
            alert("No possible moves right");
            return false;
        }
        
    }
}

Board.prototype.makeMove = function(dir){
    if (this.updateBoard(dir)) this.placeRandom();
    
}

Board.prototype.isAnyValidMove = function(){
    return this.isValidMoveLeft() || this.isValidMoveRight() || this.isValidMoveUp() || this.isValidMoveDown();
}

Board.prototype.isGameWon = function(){
    for (let i = 0; i < this.size; i++) {
        for (let j = 0; j < this.size; j++) {
            if (this.board[i][j] == this.max) {
                return true;
            }
        }
    }
    return false;
}

Board.prototype.isValidMoveLeft = function(){
    for (let i = 0; i < this.size; i++) {        
        for (let j = 1; j < this.size; j++) {  //dont check first column
            if (this.board[i][j] !== 0 && (this.board[i][j] === this.board[i][j - 1] || this.board[i][j - 1] === 0)) {
                return true;
            }
        }
    }
    return false;
}

Board.prototype.isValidMoveRight = function(){
    for (let i = 0; i < this.size; i++) {        
        for (let j = 0; j < this.size - 1; j++) {  //dont check last column
            if (this.board[i][j] !== 0 && (this.board[i][j] === this.board[i][j + 1] || this.board[i][j + 1] === 0)) {
                return true;
            }
        }
    }
    return false;
}

Board.prototype.isValidMoveUp = function(){
    for (let i = 1; i < this.size; i++) {        //dont check first row
        for (let j = 0; j < this.size; j++) {  
            if (this.board[i][j] !== 0 && (this.board[i][j] === this.board[i - 1][j] || this.board[i - 1][j] === 0)) {
                return true;
            }
        }
    }
    return false;
}

Board.prototype.isValidMoveDown = function(){
    for (let i = 0; i < this.size - 1; i++) {        //dont check last row
        for (let j = 0; j < this.size; j++) {  
            if (this.board[i][j] !== 0 && (this.board[i][j] === this.board[i + 1][j] || this.board[i + 1][j] === 0)) {
                return true;
            }
        }
    }
    return false;
}

Board.prototype.shiftLeft = function(){
    for (let j = 0; j < this.size; j++) {   //each row
        let i = 1;                     //start at column 1 (left)
        while (i < this.size) {   
            if (this.board[j][i] === 0){       //if the tile itself is 0, move on to next
                i++;
                continue;
            }
            else {
                for (let k = i; k > 0; k--) {     //shifts current tile as far left as possible
                    if (this.board[j][k - 1] !== 0 ) {  //if to the left there is not a 0, we can't shift anymore
                        break;
                    }
                    this.board[j][k - 1] = this.board[j][k];   //shift tile left
                    this.board[j][k] = 0;
                }
                i++;
            }   
        }
    }

}

Board.prototype.shiftRight = function(){
    for (let j = 0; j < this.size; j++) {   //each row
        let i = this.size - 2;                     //start at last column
        while (i >= 0) {   
            if (this.board[j][i] === 0){       //if the tile itself is 0, move on to next
                i--;
                continue;
            }
            else {
                for (let k = i; k < this.size - 1; k++) {     //shifts current tile as far right as possible
                    if (this.board[j][k + 1] !== 0) {  //if to the right there is not a 0, we can't shift anymore
                        break;
                    }
                    this.board[j][k + 1] = this.board[j][k];   //shift tile right
                    this.board[j][k] = 0;
                }
                i--;
            }
        }
    }
}

Board.prototype.shiftUp = function(){
    for (let j = 0; j < this.size; j++) { 
        let i = 1;                     
        while (i < this.size) {   
            if (this.board[i][j] === 0){       //if the tile itself is 0, move on to next
                i++;
                continue;
            }
            else {
                for (let k = i; k > 0; k--) {     //shifts current tile as far up as possible
                    if (this.board[k - 1][j] !== 0) {  //if to the above there is not a 0, we can't shift anymore
                        break;
                    }
                    this.board[k - 1][j] = this.board[k][j];   //shift tile up
                    this.board[k][j] = 0;
                }
                i++;  
            } 
        }
    }
}

Board.prototype.shiftDown = function(){
    for (let j = 0; j < this.size; j++) {
        let i = this.size - 2;                     
        while (i >= 0) {   
            if (this.board[i][j] === 0){       //if the tile itself is 0, move on to next
                i--;
                continue;
            }
            else {
                for (let k = i; k < this.size - 1; k++) {     //shifts current tile as far down as possible
                    if (this.board[k + 1][j] !== 0) {  //if below there is not a 0, we can't shift anymore
                        break;
                    }
                    this.board[k + 1][j] = this.board[k][j];   //shift tile down
                    this.board[k][j] = 0;
                }
                i--;   
            } 
        }
    }
}

Board.prototype.addLeft = function(){
    for (let i = 0; i < this.size; i++) {   //each row
        for (let j = 0; j < this.size - 1; j++) {  //column
            if (this.board[i][j] === this.board[i][j + 1] && this.board[i][j] !== 0) {
                this.board[i][j] = this.board[i][j] + this.board[i][j + 1];
                this.board[i][j + 1] = 0;
                this.score += this.board[i][j];
            }
        }
    }
}

Board.prototype.addRight = function(){
    for (let i = 0; i < this.size; i++) {   //each row
        for (let j = this.size - 1; j > 0; j--) {  //column
            if (this.board[i][j] === this.board[i][j - 1] && this.board[i][j] !== 0) {
                this.board[i][j] = this.board[i][j] + this.board[i][j - 1];
                this.board[i][j - 1] = 0;
                this.score += this.board[i][j];
            }
        }
    }
}

Board.prototype.addUp = function(){
    for (let i = 0; i < this.size; i++) {   //each column
        for (let j = 0; j < this.size - 1; j++) {  //row
            if (this.board[j][i] === this.board[j + 1][i] && this.board[j][i] !== 0) {
                this.board[j][i] = this.board[j][i] + this.board[j + 1][i];
                this.board[j + 1][i] = 0;
                this.score += this.board[j][i];
            }
        }
    }
}

Board.prototype.addDown = function(){
    for (let i = 0; i < this.size; i++) {   //each column
        for (let j = this.size - 1; j > 0; j--) {  //row
            if (this.board[j][i] === this.board[j - 1][i] && this.board[j][i] !== 0) {
                this.board[j][i] = this.board[j][i] + this.board[j - 1][i];
                this.board[j - 1][i] = 0;
                this.score += this.board[j][i];
            }
        }
    }
}

Board.prototype.resetBoard = function(){
    this.score = 0;
    for (let i = 0; i < this.size; i++){
        for (let j = 0; j < this.size; j++){
            this.board[i][j] = 0;
        }
    }
}