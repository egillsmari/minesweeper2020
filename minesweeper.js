function generateBoard() {
            //Prepare the parameter value for 'myParam'
            var paramValue = "someValue";

            //The URL to which we will send the request
            var url = 'https://veff213-minesweeper.herokuapp.com/api/v1/minesweeper';

            var rows = document.getElementById("rows").value;
            var cols = document.getElementById("columns").value;
            var mines = document.getElementById("mines").value;

            //Perform an AJAX POST request to the url, and set the param 'myParam' in the request body to paramValue
            axios.post(url, { rows: rows, cols: cols, mines: mines })
                .then(function (response) {
                    //When successful, print 'Success: ' and the received data
                    console.log("Success: ", response.data.board);

                    // Generating the board
                    for (i=0;i<cols;i++) {
                        for (j=0;j<rows;j++){
                            var btn = document.createElement("BUTTON");
                            btn.id = "" + i + "-" + j;
                            btn.className = "field";
                            btn.style.height = "20px";
                            btn.style.width = "20px";
                            document.getElementById("game-board").appendChild(btn);
                        }
                        var brk = document.createElement("br");
                        document.getElementById("game-board").appendChild(brk);
                    }


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



                    // Making a matrix for the board.
                    var board_array = [];
                    for (var i=0;i<rows;i++) {
                    board_array[i] = [];
                    }
                    for (i=0;i<rows;i++){
                        for (j=0;j<cols;j++){
                            board_array[i][j] = 0
                        }
                    }
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