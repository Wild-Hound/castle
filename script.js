const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 64 * 16;
canvas.height = 64 * 9;

class Player {
  constructor(canvas, ctx) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.position = {
      x: 100,
      y: 100,
    };
    this.width = 100;
    this.height = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
  }

  draw() {
    const ctx = this.ctx;
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    const canvas = this.canvas;
    if (this.sides.bottom < canvas.height) {
      this.position.y++;
      this.sides.bottom = this.position.y + this.height;
    }
  }
}

const player = new Player(canvas, ctx);

const animate = () => {
  window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // create scene
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // create player
  player.draw();
  player.update();
};

animate();
