const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

const bglv1 = new Sprite(
  { position: { x: 0, y: 0 }, imgSrc: "../img/backgroundLevel1.png" },
  ctx
);

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

const collisionBlocks = createCollisionBlocks(lv1MapData, ctx);
const player = new Player(
  { collisionBlocks, imgSrc: "./img/king/idle.png", frameRate: 11 },
  canvas,
  ctx
);

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bglv1.draw();
  collisionBlocks.forEach((block) => {
    block.draw();
  });

  player.velocity.x = 0;
  if (keys.d.pressed) player.velocity.x = player.movementVelocity;
  else if (keys.a.pressed) player.velocity.x = -player.movementVelocity;

  // create player
  player.draw();
  player.update();
};

animate();
