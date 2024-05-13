const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

const player = new Player(canvas, ctx);

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // create scene
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = player.movementVelocity;
  else if (keys.a.pressed) player.velocity.x = -player.movementVelocity;

  // create player
  player.draw();
  player.update();
};

animate();
