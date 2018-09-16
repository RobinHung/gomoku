var canvas = document.getElementById("chessBoard");
var context = canvas.getContext("2d");
var board = []; //0:empty 1:black 2:white
var isBlack = true;
var isGameOver = false;

// Initialize board array
for (var i = 0; i < 19; i++) {
    board[i] = [];
    for (var j = 0; j < 19; j++) {
        board[i][j] = 0;
    }
}

// Draw ChessBoard
for (var i = 0; i < 19; i++) {
    for (var j = 0; j < 19; j++) {
        context.moveTo(20, 20 + 40 * j);
        context.lineTo(740, 20 + 40 * j);
        context.stroke();

        context.moveTo(20 + 40 * i, 20);
        context.lineTo(20 + 40 * i, 740);
        context.stroke();
    }
}

// Click on chessboard
canvas.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;

    var i = Math.floor(x / 40);
    var j = Math.floor(y / 40);

    console.log(x, y);
    console.log(i, j);

    drawChess(i, j);
};

function drawChess(i, j) {
    var canvas = document.getElementById("chessBoard");
    var context = canvas.getContext("2d");
    context.beginPath();
    context.arc(20 + 40 * i, 20 + 40 * j, 15, 0, 2 * Math.PI);
    context.fill();
}

function judge() {
    var target = isBlack ? 1 : 2;
    for(var i=0;i<19;i++){
        var chessCounter=0;
        for(var j=0;j<19;j++){
            if(board[i][j]==target){
                chessCounter++;
            }else{
                chessCounter=0;
            }
            if(chessCounter==5){
                isGameOver=true;
            }
        }
    }
    for(var j=0;j<19;j++){
        var chessCounter=0;
        for(var i=0;i<19;i++){
            if(board[i][j]==target){
                chessCounter++;
            }else{
                chessCounter=0;
            }
            if(chessCounter==5){
                isGameOver=true;
            }
        }
    }
    for(var )
}