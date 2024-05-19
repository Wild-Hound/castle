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

const overlay = {
  opacity: 0,
};

const collisionBlocks = createCollisionBlocks(lv1MapData, ctx);
const player = new Player(
  {
    collisionBlocks,
    imgSrc: "./img/king/idle.png",
    frameRate: 11,
    animations: {
      idleRight: {
        frameRate: 11,
        frameBuffer: 2,
        loop: true,
        imgSrc: "./img/king/idle.png",
      },
      idleLeft: {
        frameRate: 11,
        frameBuffer: 2,
        loop: true,
        imgSrc: "./img/king/idleLeft.png",
      },
      runRight: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imgSrc: "./img/king/runRight.png",
      },
      runLeft: {
        frameRate: 8,
        frameBuffer: 4,
        loop: true,
        imgSrc: "./img/king/runLeft.png",
      },
      enterDoor: {
        frameRate: 8,
        frameBuffer: 4,
        loop: false,
        imgSrc: "./img/king/enterDoor.png",
        onComplete: () => {
          console.log("completed");
          gsap.to(overlay, {
            opacity: 1,
          });
        },
      },
    },
  },
  canvas,
  ctx
);

const doors = [
  new Sprite(
    {
      position: { x: 767, y: 270 },
      imgSrc: "./img/doorOpen.png",
      frameRate: 5,
      frameBuffer: 5,
      loop: false,
      autoplay: false,
    },
    ctx
  ),
];

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bglv1.draw();

  doors.forEach((door) => {
    door.draw();
  });

  player.velocity.x = 0;
  player.handleInput(keys);

  // create player
  player.draw();
  player.update();

  ctx.save();
  ctx.globalAlpha = overlay?.opacity;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
};

animate();
