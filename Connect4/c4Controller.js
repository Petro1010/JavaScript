{
    //get all the input arrows
    let arrows = document.getElementsByClassName("triangle-down");
    //get all the token slots
    let slots = document.getElementsByClassName("gridItem");
    //get restart button
    let restart = document.getElementById("restartbtn");
    //get the players turn display
    let turnInd = document.getElementById("pturn");
    //set up the board
    let gameActive = true;
    let b = new Board();

    //set up the events for when the input arrows are clicked
    for (let i = 0; i < arrows.length; i++){
        //create the appearing and disappearing affect of the arrows upon mouse over
        arrows[i].onmouseenter = function(){
            if (gameActive) arrows[i].style.borderTop = "50px solid black";
        }

        arrows[i].onmouseleave = function(){
            if (gameActive) arrows[i].style.borderTop = "50px solid transparent";
        }

        arrows[i].onclick = function(){
            if (gameActive){
                b.makeMove(i);  //i is the column number in this case
                updateSlots(b, slots, turnInd);
                if (b.isWon){
                    let winner = b.redTurn ? "Yellow" : "Red";
                    alert(winner + " Won!");
                    gameActive = false;
                }
            }
        }
    }

    //Update the slots to represent the live board
    function updateSlots(b, slots, turnInd){
        for (let i = 0; i < b.rows; i++){
            for (let j = 0; j < b.cols; j++){
                let slot = slots[7*i + j];
                //console.log(tile);
                if (b.board[i][j] === "r"){
                    slot.style.backgroundColor = "Red";
                    
                } else if (b.board[i][j] == "y"){
                    slot.style.backgroundColor = "Yellow";
                } else{
                    slot.style.backgroundColor = "#e4dddd";
                }
            }
        }
        let turnCol = b.redTurn ? "Red" : "Yellow";
        turnInd.style.backgroundColor = turnCol;
    }

    restart.onclick = function(){
        //clear the board
        b.clearBoard();
        //make sure all arrows and slots start transparent
        for (let i = 0; i < arrows.length; i++){
            arrows[i].style.borderTop = "50px solid transparent"
        }
        updateSlots(b, slots, turnInd);
        //turnInd.style.backgroundColor = "Red";
        //make game active again
        gameActive = true;
    }
}