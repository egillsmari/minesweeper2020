function generateBoard() {
            //Prepare the parameter value for 'myParam'
            var paramValue = "someValue";

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


                    // Generating the board
                    // create bomb position array
                    var minesArray = response.data.board.minePositions;
                    var board_array = [];
                    for (i=0;i<cols;i++) {
                        board_array[i] = [];
                        for (j=0;j<rows;j++){
                            var btn = document.createElement("BUTTON");
                            btn.id = "" + i + "-" + j;
                            btn.className = "field";
                            btn.style.height = "40px";
                            btn.style.width = "40px";
                            if (isMine(i, j, minesArray) === true){
                                board_array[i][j] = "M";
                                btn.innerText = "M"
                            }
                            else{
                                board_array[i][j] = [i,j];
                                btn.innerText = "" + i + "-" + j
                            }
                            document.getElementById("game-board").appendChild(btn);
                        }
                        var brk = document.createElement("br");
                        document.getElementById("game-board").appendChild(brk);
                    }
                    console.log(board_array);
                    placeNumbers(board_array, cols, rows);



                    //
                    for (i=0;i<cols;i++){
                        for (j=0;j<rows;j++){
                            document.getElementById("" + i + "-" + j).onmousedown = function (event) {
                                if (event.which === 1){
                                    alert("what")
                                }
                                else if (event.which === 3){
                                    var red_flag = document.createElement("img");
                                    red_flag.id = "flag";
                                    red_flag.src = "images/flag.png";
                                    document.getElementById(this.id).appendChild(red_flag);
                                }
                            }
                        }
                    }



                    // Making a matrix for the board

                })

                .catch(function (error) {
                    //When unsuccessful, print the error.
                    console.log(error);
                })
                .then(function () {
                    // This code is always executed, independent of whether the request succeeds or fails.
                });
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
            console.log(board_array[i]);
            var btn = document.getElementById("" + i + "-" + j);
            if (board_array[i][j] === "M") {
                console.log("bomb!!!!");
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
            btn.innerHTML = ""+tempBomb
            }
    }

}























