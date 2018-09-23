var canvas = document.getElementById("chessBoard");
var context = canvas.getContext("2d");

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

var gameID = null;
var playerColor = null; // true = black, false = white

window.addEventListener("load", async () => {
  if (window.location.hash.length == 0) {
    gameID = await (await fetch("/game", { method: "POST" })).text();
    window.location.hash = "#" + gameID;
    playerColor = true; // black
    joinGame(gameID);
  } else {
    gameID = window.location.hash.substr(1);
    gameID = await (await fetch(`/game?id=${gameID}`, { method: "POST" })).text();
    if(gameID=="error") alert("wrong game ID");
    else{
      playerColor = false; // white
      joinGame(gameID);
    }
  }
});

// setup connection between client and server
var socket = io.connect("localhost:5000");

// @dev: Testing purpose! Should be deleted!
socket.emit("test", function() {
  console.log("testing message!");
});

// join gameroom
function joinGame(gameID) {
  socket.emit("join", gameID);
}

// Click on chessboard, then emit events to the server
canvas.onclick = function(e) {
  var x = e.offsetX;
  var y = e.offsetY;

  var i = Math.floor(x / 40);
  var j = Math.floor(y / 40);

  socket.emit("play", {
    id: gameID,
    color: playerColor,
    row: i,
    column: j
  });
};

// Receive Event from server, then draw on chessboard canvas!
socket.on("draw", function(json) {
    let obj=JSON.parse(json)
    drawChessBoard(obj.row,obj.column,obj.color)
});

function drawChessBoard(i, j, playerColor) {
  var canvas = document.getElementById("chessBoard");
  var context = canvas.getContext("2d");
  context.beginPath();
  context.arc(20 + 40 * i, 20 + 40 * j, 15, 0, 2 * Math.PI);

  if (playerColor) {
    context.fillStyle = "black";
  } else {
    context.fillStyle = "white";
  }
  context.fill();
}

// Game Finish Signal
// @dev: parameters to be passed...
socket.on("finish", function gameFinish(msg) {
  alert(msg+" wins!");
});
