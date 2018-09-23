var canvas = document.getElementById("chessBoard");
var context = canvas.getContext("2d");
var board = []; //0:empty 1:black 2:white
var isBlack = true;
var isGameOver = false;
var socket = io.connect("localhost:5000");
socket.emit("test message");

let a=1;
let b=a*2;

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
  if (isGameOver) return;
  var x = e.offsetX;
  var y = e.offsetY;

  var i = Math.floor(x / 40);
  var j = Math.floor(y / 40);
  if(board[i][j]!=0) return;
  board[i][j]=isBlack?1:2;

  drawChess(i, j, isBlack);
  judge();
  isBlack = !isBlack;
};

function drawChess(i, j, isBlack) {
  var canvas = document.getElementById("chessBoard");
  var context = canvas.getContext("2d");
  context.beginPath();
  context.arc(20 + 40 * i, 20 + 40 * j, 15, 0, 2 * Math.PI);

  if (isBlack) {
    context.fillStyle = "black";
  } else {
    context.fillStyle = "white";
  }
  context.fill();
}

function judge() {
  var target = isBlack ? 1 : 2;
  for (var i = 0; i < 19; i++) {
    var chessCounter = 0;
    for (var j = 0; j < 19; j++) {
      if (board[i][j] == target) {
        chessCounter++;
      } else {
        chessCounter = 0;
      }
      if (chessCounter == 5) {
        isGameOver = true;
      }
    }
  }
  for (var j = 0; j < 19; j++) {
    var chessCounter = 0;
    for (var i = 0; i < 19; i++) {
      if (board[i][j] == target) {
        chessCounter++;
      } else {
        chessCounter = 0;
      }
      if (chessCounter == 5) {
        isGameOver = true;
      }
    }
  }
  for (var i = -14; i < 14; i++) {
    var chessCounter = 0;
    for (var j = Math.max(-i, 0); j < Math.min(19 - i, 19); j++) {
      if (board[i + j][j] == target) {
        chessCounter++;
      } else {
        chessCounter = 0;
      }
      if (chessCounter == 5) {
        isGameOver = true;
      }
    }
  }
  for (var i = 4; i < 32; i++) {
    var chessCounter = 0;
    for (var j = Math.max(0, i - 18); j <= Math.min(i, 18); j++) {
      if (board[i - j][j] == target) {
        chessCounter++;
      } else {
        chessCounter = 0;
      }
      if (chessCounter == 5) {
        isGameOver = true;
      }
    }
  }
  if (isGameOver) {
    if (isBlack) window.alert("Black wins!");
    else window.alert("White wins!");
  }
}