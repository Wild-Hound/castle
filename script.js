const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// create scene
canvas.width = 64 * 16;
canvas.height = 64 * 9;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
