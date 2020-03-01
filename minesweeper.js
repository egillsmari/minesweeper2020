var BOMBFLAGGED = 0;
var PRESSEDMINES = 0;
function generateBoard() {

            //The URL to which we will send the request
            var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("columns").value;
            var mines = document.getElementById("mines").value;

            if (rows > 40 || cols > 40 || rows < 1 || cols < 1){
                rows = 10;
                cols = 10;
            }
            if (mines > rows*cols){
                mines = 10;
            }

            //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
            axios.post(url, { rows: rows, cols: cols, mines: mines })
                .then(function (response) {
                    //When successful, print 'Success: ' and the received data
                    console.log("Success: ", response.data.board);

                    var board_array = createMineSweeper(rows, cols, response);
                    addEvents(board_array, rows, cols, mines);
                    console.log(board_array)
                })

                .catch(function (error) {
                    //When unsuccessful, print the error.
                    console.log(error);
                })
                .then(function () {
                    // This code is always executed, independent of whether the request succeeds or fails.
                });
        }


function addEvents(board_array, rows, cols, mines) {
    for (let i=0;i<cols;i++){
        for (let j=0;j<rows;j++){
            document.getElementById("" + i + "-" + j).onmousedown = function (event) {
            if (event.which === 1){
                console.log(board_array[i][j]);
                document.getElementById(this.id).innerHTML = board_array[i][j];
                board_array[i][j] = ""+board_array[i][j]+"P";
                console.log(board_array);
                PRESSEDMINES += 1;
                isWinner(mines, board_array);
                isLooser(board_array[i][j])

            }
            else if (event.which === 3){

                var red_flag = document.createElement("img");
                red_flag.id = "flag";
                red_flag.src = "images/flag.png";
                document.getElementById(this.id).appendChild(red_flag);
                if (board_array[i][j] === "M"){
                    BOMBFLAGGED+= 1;
                    isWinner(mines, rows, cols);
                    console.log("dis da bomb");

                }
                board_array[i][j] = ""+board_array[i][j]+"F";


            }
        }
    }
}
    return board_array
}

function isWinner(mines, rows, cols) {
    rows = parseInt(rows);
    mines = parseInt(mines);
    cols = parseInt(cols);
    if (BOMBFLAGGED === mines && PRESSEDMINES === rows*cols - mines){
        alert("YOU JUST WON THE GAME MATE");
        killGame()
    }
}

function isLooser(currentPressed) {
    console.log(currentPressed);
    if(currentPressed === "MP"){
        alert("YOU JUST LOST THE GAME MATE");
        killGame()
    }
    
}

function killGame(){
    // implement function that stops all process and you can only press the generate board button
}

function createMineSweeper(rows, cols, response) {
    cleanBoard();
    var minesArray = response.data.board.minePositions;
        var board_array = [];
        for (i=0;i<cols;i++) {
            board_array[i] = [];
            for (j=0;j<rows;j++){
                var btn = document.createElement("BUTTON");
                btn.id = "" + i + "-" + j;
                btn.className = "field";
                btn.style.height = "25px";
                btn.style.width = "25px";
                if (isMine(i, j, minesArray) === true){
                    board_array[i][j] = "M";
                }
                else{
                    board_array[i][j] = 0;
                }
                document.getElementById("game-board").appendChild(btn);
            }
            var brk = document.createElement("br");
            document.getElementById("game-board").appendChild(brk);
        }
        placeNumbers(board_array, cols, rows);
        return board_array

}

function cleanBoard() {
    var board = document.getElementById("game-board");
    board.innerHTML = "";


}


function isMine(rows, cols, minesArray) {
    for (var x = 0; x < minesArray.length; x++) {
        var mine = minesArray[x];

        if (mine[0] === rows && mine[1] === cols){
            return true
        }
            }
}

function placeNumbers(board_array, cols, rows) {
    var tempLis = [];
    for (i=0;i<cols;i++){
        tempLis.push([]);
        for (j=0;j<rows;j++) {
            tempLis[i].push(0);
            var tempBomb = 0;
            if (board_array[i][j] === "M") {
                tempLis[i][j] = "M";
                continue
            }
            try{
            if (board_array[i-1] [j-1] === "M"){
                tempBomb += 1
            }
            }
            catch (e) {}
            try{
            if (board_array[i][j-1] === "M"){
                tempBomb += 1
            }}
            catch (e) {}
            try{
            if (board_array[i][j+1] === "M"){
                tempBomb += 1
            }}
            catch (e) {}
            try{
            if (board_array[i+1][j-1] === "M"){
                tempBomb += 1
            }}
            catch (e) {}
            try{
                if (board_array[i+1][j+1] === "M"){
                    tempBomb += 1
            }}
            catch (e) {}
            try{
                if (board_array[i+1][j] === "M"){
                    tempBomb += 1
            }}
            catch (e) {}
            try {
                if (board_array[i - 1][j + 1] === "M") {
                    tempBomb += 1}
            }
            catch (e) {}
            try {
                if (board_array[i-1][j] === "M") {
                    tempBomb += 1}
            }
            catch (e) {}
            board_array[i][j] = JSON.stringify(tempBomb);
            }
    }

}