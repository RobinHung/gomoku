var canvas = document.getElementById("chessBoard");
var context = canvas.getContext("2d");
var board = [];
var isBlack = true;
var isGameOver = false;

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
canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;

  var i = Math.floor(x / 40);
  var j = Math.floor(y / 40);

  //   console.log(x, y);
  //   console.log(i, j);

  drawChess(i, j, isBlack);
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
